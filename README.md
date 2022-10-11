# Description

- Frontend to register and search profiles and then getting some data(scraping) from github

# Features

1. Register user
   1. Providing name and a github profile
   2. After a few moments will scrap data from his github profile and fill his corresponding row
2. Search for registered users(list)
   1. Pagination
   2. Filter by name(looking between `name`, `githubProfile`, `organization`, `localization`)
3. Edit profile
4. Delete profile
5. Request the rescan(1.2)

# Missing things/features(backlog)

- Better layout decisions
- Better code decisions(too much prop drilling)
  - Maybe using React context
  - Better architecture decisions: hooks and components
  - Separate better business logic into hooks
- Instant search on "key press", instead of using the button or "enter" to search
  - Using debounce to prevent unnecessary requests
- Responsive design
- Deal with backend errors, such as
  - User already in use
  - Scan was realized less than 5 minutes ago
  - Network problems
- Automated tests
- Notifications of actions, such as:
  - Edited/created with success
  - Error on CRUD
  - Rescan initiated
- Preserve the current state
  - If on second page and deleted some item continue on same page instead of going to first page
- Clean code
- Check which functions/methods is more appropriate to use useCallback(prevent heavy interfaces and unnecessary renders)
- Components with too much responsabilities
  - Such as Modal both in UI and logic
- Use a better flux to actions on table/list
  - When editing some item, instead of requesting again for pagination just update the item of the list
    - Maybe using `react-query` with his powerful features or just doing on logic
- Cache items
  - `react-query`
- Modal button are too close(better spacing between them)
- On the list use less fields(more detailed things on view/edit)
- Use of accessibility techniques such as `aria` and more appropriate "tags"

## Project dependency

- `profile_gh_indexer`

## Dependencies

- `yarn` or `npm`
- Install dependencies running `yarn install` or `npm install`

## Run local

- `yarn dev` or `npm run dev`
- open http://localhost:3001
