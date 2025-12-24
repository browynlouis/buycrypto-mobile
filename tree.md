
```
buy-crypto-mobile
├─ .prettierignore
├─ .prettierrc
├─ api
│  ├─ clients
│  │  ├─ fetch-client.ts
│  │  ├─ middlewares
│  │  │  └─ auth.middleware.ts
│  │  └─ query-client.ts
│  ├─ generated
│  │  └─ schema.ts
│  ├─ queries
│  │  ├─ auth
│  │  │  ├─ hooks
│  │  │  │  └─ actions
│  │  │  │     ├─ index.ts
│  │  │  │     ├─ use-forgot-password.ts
│  │  │  │     ├─ use-login.ts
│  │  │  │     ├─ use-registration.ts
│  │  │  │     ├─ use-reset-password.ts
│  │  │  │     └─ use-verification.ts
│  │  │  ├─ index.ts
│  │  │  ├─ keys.ts
│  │  │  └─ options.ts
│  │  ├─ kyc
│  │  │  ├─ hooks
│  │  │  │  └─ actions
│  │  │  │     ├─ index.ts
│  │  │  │     └─ use-kyc-request.ts
│  │  │  ├─ index.ts
│  │  │  ├─ keys.ts
│  │  │  └─ options.ts
│  │  └─ user
│  │     ├─ hooks
│  │     │  └─ actions
│  │     │     ├─ index.ts
│  │     │     ├─ use-password-update.ts
│  │     │     ├─ use-profile-update.ts
│  │     │     ├─ use-toggle-auth-app.ts
│  │     │     └─ use-update-username.ts
│  │     ├─ index.ts
│  │     ├─ keys.ts
│  │     └─ options.ts
│  ├─ schemas
│  │  ├─ auth.schema.ts
│  │  ├─ helpers.schema.ts
│  │  └─ user.schema.ts
│  └─ types.ts
├─ app
│  ├─ (auth)
│  │  ├─ index.tsx
│  │  ├─ login
│  │  │  ├─ index.tsx
│  │  │  └─ _layout.tsx
│  │  ├─ password
│  │  │  ├─ index.tsx
│  │  │  ├─ reset.tsx
│  │  │  └─ _layout.tsx
│  │  ├─ registration
│  │  │  ├─ credentials.tsx
│  │  │  ├─ index.tsx
│  │  │  └─ _layout.tsx
│  │  └─ _layout.tsx
│  ├─ (protected)
│  │  ├─ (app)
│  │  │  ├─ assets
│  │  │  │  └─ index.tsx
│  │  │  ├─ home
│  │  │  │  └─ index.tsx
│  │  │  └─ _layout.tsx
│  │  ├─ (kyc)
│  │  │  ├─ confirmation.tsx
│  │  │  ├─ index.tsx
│  │  │  └─ _layout.tsx
│  │  ├─ (user-center)
│  │  │  ├─ index.tsx
│  │  │  └─ settings
│  │  │     ├─ index.tsx
│  │  │     ├─ my-info
│  │  │     │  ├─ personal-info
│  │  │     │  │  └─ index.tsx
│  │  │     │  ├─ security
│  │  │     │  │  ├─ index.tsx
│  │  │     │  │  └─ password.tsx
│  │  │     │  └─ username.tsx
│  │  │     └─ preferences
│  │  │        └─ appearance.tsx
│  │  └─ _layout.tsx
│  ├─ +not-found.tsx
│  ├─ index.tsx
│  └─ _layout.tsx
├─ app.json
├─ assets
│  ├─ fonts
│  │  ├─ circular-std-black.ttf
│  │  ├─ circular-std-bold.ttf
│  │  └─ circular-std-medium.ttf
│  └─ images
│     ├─ favicon.png
│     ├─ icon.png
│     ├─ partial-react-logo.png
│     ├─ react-logo.png
│     ├─ react-logo@2x.png
│     ├─ react-logo@3x.png
│     └─ splash-icon.png
├─ bun.lock
├─ components
│  ├─ features
│  │  ├─ auth
│  │  │  └─ screens
│  │  │     ├─ forgot-password
│  │  │     │  ├─ forgot-password.screen.tsx
│  │  │     │  └─ reset-password.screen.tsx
│  │  │     ├─ index.ts
│  │  │     ├─ login.screen.tsx
│  │  │     └─ registration
│  │  │        ├─ country-selection.screen.tsx
│  │  │        ├─ form-provider
│  │  │        │  └─ registration-form-provider.tsx
│  │  │        └─ registration.screen.tsx
│  │  ├─ kyc
│  │  │  └─ screens
│  │  │     ├─ confirmation.screen.tsx
│  │  │     ├─ index.ts
│  │  │     ├─ kyc.screen.tsx
│  │  │     └─ _partials
│  │  │        ├─ intro.tsx
│  │  │        ├─ kyc-limits.tsx
│  │  │        └─ personal-info.tsx
│  │  └─ user
│  │     ├─ screens
│  │     │  ├─ index.ts
│  │     │  ├─ settings
│  │     │  │  ├─ my-info
│  │     │  │  │  ├─ personal-info
│  │     │  │  │  │  └─ personal-info.screen.tsx
│  │     │  │  │  └─ security
│  │     │  │  │     ├─ password.screen.tsx
│  │     │  │  │     ├─ security.screen.tsx
│  │     │  │  │     └─ _partials
│  │     │  │  │        └─ authenticator-app
│  │     │  │  │           ├─ setup-modal.tsx
│  │     │  │  │           └─ toggle-auth-app.tsx
│  │     │  │  ├─ preferences
│  │     │  │  │  └─ appearance.screen.tsx
│  │     │  │  └─ settings.screen.tsx
│  │     │  └─ user-center.screen.tsx
│  │     └─ _partials
│  │        └─ profile-header.tsx
│  └─ shared
│     ├─ layouts
│     │  └─ page.tsx
│     ├─ providers
│     │  ├─ auth-provider
│     │  │  ├─ authenticated-provider.tsx
│     │  │  ├─ components
│     │  │  │  └─ verification-form.tsx
│     │  │  ├─ hooks
│     │  │  │  └─ index.ts
│     │  │  ├─ types
│     │  │  │  └─ index.ts
│     │  │  └─ verification-provider.tsx
│     │  ├─ confirmation-provider
│     │  │  ├─ confirmation-provider.tsx
│     │  │  ├─ hooks
│     │  │  │  └─ index.tsx
│     │  │  └─ types
│     │  │     └─ index.ts
│     │  ├─ query-provider.tsx
│     │  └─ theme-provider
│     │     ├─ hooks
│     │     │  └─ index.ts
│     │     └─ theme-provider.tsx
│     └─ ui
│        ├─ avatar.tsx
│        ├─ badge.tsx
│        ├─ bottom-screen-wrapper.tsx
│        ├─ button
│        │  ├─ button.styled.ts
│        │  ├─ button.tsx
│        │  └─ index.ts
│        ├─ card
│        │  ├─ card.styled.ts
│        │  └─ index.ts
│        ├─ copy-button.tsx
│        ├─ country-select.tsx
│        ├─ date-picker.tsx
│        ├─ description-header.tsx
│        ├─ flex.tsx
│        ├─ header.tsx
│        ├─ icon.tsx
│        ├─ input
│        │  ├─ index.ts
│        │  ├─ input.styled.ts
│        │  └─ input.tsx
│        ├─ list
│        │  └─ data-list.tsx
│        ├─ loader.tsx
│        ├─ menu-list-item.tsx
│        ├─ modal.tsx
│        ├─ qr-code.tsx
│        ├─ select-input.tsx
│        ├─ skeleton.tsx
│        ├─ spinner.tsx
│        ├─ switch.tsx
│        ├─ tabbed-view.tsx
│        ├─ text.tsx
│        ├─ toaster.tsx
│        └─ wallet
│           └─ wallet-panel.tsx
├─ constants
│  ├─ common.ts
│  └─ exceptions.ts
├─ eas.json
├─ eslint.config.js
├─ hooks
│  ├─ index.ts
│  └─ use-auth.ts
├─ lib
│  ├─ config
│  │  ├─ app-config.ts
│  │  ├─ index.ts
│  │  └─ toast-config.tsx
│  └─ utils
│     ├─ countries.ts
│     ├─ index.ts
│     ├─ map-server-errors.ts
│     ├─ print-json.ts
│     ├─ resolve-kyc-level.ts
│     └─ toast.ts
├─ package.json
├─ README.md
├─ store
│  ├─ index.ts
│  ├─ use-app.store.ts
│  └─ use-auth.store.ts
├─ styles
│  ├─ colors.ts
│  ├─ index.ts
│  └─ theme.ts
├─ tree.md
├─ tsconfig.json
└─ types
   └─ index.d.ts

```