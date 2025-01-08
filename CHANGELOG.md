# Changelog
In the following you'll find the changelogs of the WeMatch MatchMaker **starting after version 1.2.4**. Every changelog needs to have following information parts (even if they're empty):

- Version number
- Release date
- Frontend changes (if necessary)
- Backend changes (if necessary)
- Other changes (version or third-party changes)

# Releases

## Version 2.1.2 - 8.1.2024

## Frontend
Design Fix: Person-field in Termination-View

## Backend
Hotfix: addAgreement didn't work => IDs weren't in Map docxMapWeMatch

## Version 2.1.1 - 2.1.2024

## Frontend
Hotfix: changed saveUser in firebase-config to match backend response

## Backend
Hotfix: wrong port in prod.properties

## Version 2.1 - 2.1.2024

## Frontend/Backend
Deleted WeMatch Projects GmbH as choice option

## Backend
Fixed saveUserInfo in PrivateEndpoint class to save user data in db correctly

## Version 2 - 19.12.2024

## Frontend
- New and uniform design with dropdowns, breadcrumbs and a new background
- Possibility to run via docker (not in use)
- New folder structure with consultants, leaders and legal

## Version 1.2.7 - 25.10.2024

### Frontend
Deleted method for creating the wematchAnsprechpartnerMail - instead now it's getting the ownerMail from the backend response directly
Cause of the change: the system didn't handle Ä,Ö,Ü etc. in email-addresses

## Version 1.2.6

### Not logged

## Version 1.2.5 - 14.06.2024

### Backend
The 'zahlungszielPP' variable is now coming from the bullhorn field 'customText23' instead of 'correlatedCustomText1'.
