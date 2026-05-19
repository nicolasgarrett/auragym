# Security Specification - AuraGym

## Data Invariants
1. A user can only read and write their own profile document.
2. The `uid` in the document must match the authenticated user's ID.
3. The `plan` must be one of the allowed values.
4. `createdAt` is immutable.

## The Dirty Dozen Payloads
1. Attempting to create a profile for another UID.
2. Attempting to update another user's plan.
3. Attempting to change `createdAt` on update.
4. Attempting to set an invalid plan type.
5. Attempting to read all user profiles.
6. Attempting to delete another user's profile.
7. Injecting 1MB string into `displayName`.
8. Setting `auraModeEnabled` without being authenticated.
9. Spoofing `email_verified` (rules must check token).
10. Creating profile with missing required fields.
11. Updating `uid` field to a different value.
12. Attempting to write to a non-existent collection.

## Test Runner (Logic Check)
The rules will prevent these by matching UID and enforcing schema size/types.
