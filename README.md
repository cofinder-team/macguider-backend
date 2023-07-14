# macguider-backend

Backend Repository for [Macguider](https://macguider.io)

## Execution Guides

### Environment Configuration

Configuration by environment variable should be done before running the app.

- At:
  - `.env` file
- About:
  - `APP_PORT`: Application listening port
  - `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE`: Database configurations

#### Example configuration

```
APP_PORT = 3000
DB_HOST = localhost
DB_PORT = 5432
DB_USERNAME = postgres
DB_PASSWORD = postgres
DB_DATABASE = postgres
```

### Installation

```bash
$ npm install
```

### Execution

#### Local Serve

```bash
$ npm run start:local
```

#### Development Deployment

```bash
$ npm run start:prod
$ npm run start:dev
```

#### Production Deployment

```bash
$ npm run build
$ npm run start:prod
```

## Contribution Rules

### Commit Convention

```
type(scope): Subject

body

footer
```

#### Commit Type

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Changes to documentation
- `style`: Formatting, missing semi colons, etc; no code change
- `refactor`: Refactoring production code
- `test`: Adding tests, refactoring test; no production code change
- `chore`: Updating build tasks, package manager configs, etc; no production code change

If you think a new commit type is needed, you can contribute by changing `commitlint.config.js` and this paragraph.

### Branching Strategy

- `master`: branch to manage only stable states deployed to product
- `develop`: branch to integrate features to be deployed (development is mainly based on this branch)
- `feature`: branch to develop new features
- `hotfix`: branch to correct urgent issues

#### Branch Flows

- branch `feature` from `develop` -> develop features in `feature` -> pull request to `develop` -> approve and merge to `develop`
- `develop` become distributable -> merge `develop` to `master`, deploy `master` to product, add a version tag to `master`
- branch `hotfix` from `master` -> fix issues in `hotfix` -> pull request to `master` -> approve and merge to `master` and `develop`

#### Branch Naming Convention

`feature/swm-issue#`

ex) `feature/swm-123`
