EXTENSION_NAME := browser-window-and-tab-stats
VERSION := $(shell jq -r '.version' manifest.json)

package: clean
	@echo "Packaging $(EXTENSION_NAME) version $(VERSION)..."
	@zip -qr $(EXTENSION_NAME)-$(VERSION).zip * --exclude '.*' 'screenshots/*' 'screenshot*.png' 'savedFileNamesToJSON.js' 'test-input' 'node_modules/*' 'package*.json' Makefile '*.py' '*.zip'
	@echo "Package created: $(EXTENSION_NAME)-$(VERSION).zip"

list:
	@unzip -l $(EXTENSION_NAME)-$(VERSION).zip

clean:
	[[ -f $(EXTENSION_NAME)-$(VERSION).zip ]] && echo "Removing $(EXTENSION_NAME)-$(VERSION).zip..." || echo "No $(EXTENSION_NAME)-$(VERSION).zip to remove."
	[[ -f $(EXTENSION_NAME)-$(VERSION).zip ]] && rm -v $(EXTENSION_NAME)-$(VERSION).zip || echo "No $(EXTENSION_NAME)-$(VERSION).zip to remove."
	# @rm -v $(EXTENSION_NAME)-$(VERSION).zip

.PHONY: package list clean