# Loopback Local Web Presence

**Authority:** [DR 0039](../../../decisions/0039-loopback-local-web-presence.md)

`npm run hal:web` starts HAL's provisional local browser presence. It binds to
`127.0.0.1` on a random port, creates a fresh per-launch session token, and
opens that exact loopback URL in the Owner's default browser.

The page offers the four existing bounded question scopes and the same
allowlisted HAL Control Chat messages defined in
[Local Control Chat](LOCAL_CONTROL_CHAT.md). It is not a general web server,
LAN service, remote interface, terminal, filesystem browser, model provider,
or runtime capability route.

Start it from the active HAL implementation directory:

```sh
cd /Users/rosslauda/Documents/HAL/implementation/hal-core
npm run hal:web
```

Keep the terminal open while using the page. Press `Ctrl+C` in that terminal to
end the local session. Consequential control requests still require the
displayed `approve <proposal-id>` confirmation and are recorded by HAL in its
integrity-chained ignored local journal.

The random port and token prevent accidental exposure and cross-site requests;
they do not make a web browser a security boundary against other malicious
processes already running under the same local user account.
