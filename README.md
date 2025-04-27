# Prerequisite

## Install NodeJS for Playwright Server

### Install Volta (easier way)

**Windows**
- winget install Volta.Volta

**Linux**
- curl https://get.volta.sh | bash

**Install Node**
- volta install {node_version}
- volta install node@18

# Set-up

## Clone repository

- Set up an SSH key on your github account
- Clone this repository

## Install dependencies
- npm install 
- npx playwright install

# Running Test

### Running the entire suite

**With 3 browsers (Chromium, Firefox, Webkit)**
- npx playwright test

**With specific browser**
- npx playwright test --project chromium
- npx playwright test --project firefox
- npx playwright test --project webkit

**Run in not headless mode**
- npx playwright test --headed

**Run in UI Mode**
- npx playwright test --ui
