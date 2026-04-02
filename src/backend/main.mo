import Map "mo:core/Map";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Array "mo:core/Array";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  type UserId = Principal;
  type FileId = Text;

  type FileMetadata = {
    fileId : FileId;
    fileName : Text;
    size : Nat;
    uploadTimestamp : Time.Time;
    owner : UserId;
    isEncrypted : Bool;
  };

  module FileMetadata {
    public func compare(file1 : FileMetadata, file2 : FileMetadata) : Order.Order {
      Int.compare(file2.uploadTimestamp, file1.uploadTimestamp);
    };
  };

  type UserProfile = {
    displayName : Text;
    email : Text;
    agreedToTerms : Bool;
  };

  let userProfiles = Map.empty<UserId, UserProfile>();
  let files = Map.empty<FileId, FileMetadata>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func getCurrentUserProfile() : async UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    switch (userProfiles.get(caller)) {
      case (?profile) { profile };
      case (null) { Runtime.trap("User not registered") };
    };
  };

  public query ({ caller }) func getMyFiles() : async [FileMetadata] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can list files");
    };
    files.values().toArray().filter(
      func(file) { file.owner == caller }
    ).sort();
  };

  public shared ({ caller }) func addFileMetadata(metadata : FileMetadata) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add files");
    };
    if (metadata.owner != caller) {
      Runtime.trap("Unauthorized: Can only add files you own");
    };
    files.add(metadata.fileId, metadata);
  };

  public shared ({ caller }) func deleteFileAndMetadata(fileId : FileId) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete files");
    };
    switch (files.get(fileId)) {
      case (?metadata) {
        if (metadata.owner != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only delete your own files");
        };
        files.remove(fileId);
      };
      case (null) { Runtime.trap("File not found") };
    };
  };

  func containsIgnoreCase(text : Text, searchTerm : Text) : Bool {
    text.toLower().contains(#text(searchTerm.toLower()));
  };

  public query ({ caller }) func searchFilesByCompositeIdentifier(searchTerm : Text) : async [FileMetadata] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can search files");
    };
    let isAdminUser = AccessControl.isAdmin(accessControlState, caller);
    files.values().toArray().filter(
      func(file) {
        let matchesSearch = containsIgnoreCase(file.fileName, searchTerm);
        let hasAccess = isAdminUser or file.owner == caller;
        matchesSearch and hasAccess;
      }
    );
  };

  public query ({ caller }) func getUserFileCount(userId : UserId) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view file counts");
    };
    if (caller != userId and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own file count");
    };
    files.values().toArray().filter(
      func(file) { file.owner == userId }
    ).size();
  };

  public query ({ caller }) func isAdmin(user : Principal) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can check admin status");
    };
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only check your own admin status");
    };
    switch (AccessControl.getUserRole(accessControlState, user)) {
      case (#admin) { true };
      case (_) { false };
    };
  };
};
