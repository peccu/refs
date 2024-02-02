#!/bin/bash

# Setup (register) Tailscale

# authkey has generated from
# https://login.tailscale.com/admin/settings/keys
# should be added in github profiles
# https://github.com/settings/codespaces/secrets/new
# or add permission to current repository
# https://github.com/settings/codespaces
sudo tailscale up --authkey $TAILSCALE_AUTHKEY
