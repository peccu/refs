#!/bin/bash

# Setup (register) Tailscale

# authkey has generated from
# https://login.tailscale.com/admin/settings/keys
# should be added in github profiles
# https://github.com/settings/codespaces/secrets/new
# or add permission to current repository
# https://github.com/settings/codespaces
sudo tailscale up --authkey $TAILSCALE_AUTHKEY

mkdir -p ~/.ssh
echo "$SSH_PUBKEY" >> ~/.ssh/authorized_keys
sudo usermod --password $(openssl passwd -1 "$LINE_NOTIFY") $(whoami)

message="Codespace setup finished.

$(whoami)@$(tailscale status | grep $(hostname) | awk '{print $1}')

ssh config looks like below:

Host cs
  Hostname $(hostname).yourcode.ts.net
  User $(whoami)
  IdentityFile /root/.ssh/keys/id_rsa
  Port 2222

"
curl -X POST  https://notify-api.line.me/api/notify \
     -H 'Authorization: Bearer '$LINE_NOTIFY \
     -F "message=$message"
