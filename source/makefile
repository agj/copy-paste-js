init: ## Load a shell with all dependencies (if you don't use direnv).
	@echo "You may type 'exit' to return to the regular shell.\n"
	nix develop -c "$$SHELL"

build: install ## Build the markdown files.
	ts-node ./build.ts

test: install ## Run tests.
	npx jest --show-seed

test-watch: install ## Run tests and watch for changes.
	npx jest --show-seed --watch

install:
	pnpm install



# The following makes this file self-documenting.
# See: https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help
