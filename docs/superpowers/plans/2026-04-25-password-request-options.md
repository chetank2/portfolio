# Password Request Options Plan

Goal: Let viewers request access to protected case studies from the locked gate without exposing protected content.

## Changes

- Add shared password request channel config and message builders in `src/lib/caseStudyProtection.ts`.
- Add `src/components/react/PasswordRequestOptions.tsx` with LinkedIn, X, and Email request actions.
- Render the request options inside `ProtectedCaseStudy` below the Unlock button while the gate is locked.

## Behavior

- Email opens a `mailto:` URL with a prefilled subject and body.
- X opens `https://x.com/messages/compose` with recipient ID `784100815891894272` and the request text prefilled.
- LinkedIn opens `https://linkedin.com/in/chetan-kumar25/`; the request message is copied for manual paste.
- Each action briefly changes its label to `copied` after clipboard copy succeeds.

## Verification

- Run `npm run build`.
- Run `npm run dev`.
- Open a protected route in a fresh session, such as `/work/control-tower`, `/work/journey-redesign`, `/work/freight-invoicing`, `/work/tigersight`, or `/work/ptl-module-design`.
- Confirm the locked gate shows Unlock plus LinkedIn, X, and Email request options.
- Confirm unlocking hides the gate and request options.
