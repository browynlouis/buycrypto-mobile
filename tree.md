
```
buy-crypto-mobile
├─ .prettierignore
├─ .prettierrc
├─ api
│  ├─ auth
│  │  ├─ actions
│  │  │  ├─ index.ts
│  │  │  ├─ use-forgot-password.ts
│  │  │  ├─ use-login.ts
│  │  │  ├─ use-registration.ts
│  │  │  ├─ use-reset-password.ts
│  │  │  └─ use-verification.ts
│  │  └─ routes
│  │     ├─ auth.mutation.ts
│  │     ├─ auth.query.ts
│  │     └─ index.ts
│  └─ user
│     ├─ actions
│     └─ routes
│        ├─ index.ts
│        ├─ user.mutation.ts
│        └─ user.query.ts
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
│  │  │  ├─ credentials-form.tsx
│  │  │  ├─ index.tsx
│  │  │  └─ _layout.tsx
│  │  └─ _layout.tsx
│  ├─ (protected)
│  │  ├─ (user-center)
│  │  │  ├─ index.tsx
│  │  │  └─ settings
│  │  │     ├─ index.tsx
│  │  │     ├─ my-info
│  │  │     │  ├─ kyc
│  │  │     │  ├─ security
│  │  │     │  │  └─ index.tsx
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
│  │  │  ├─ schema
│  │  │  │  └─ index.ts
│  │  │  ├─ screens
│  │  │  │  ├─ forgot-password
│  │  │  │  │  ├─ forgot-password.screen.tsx
│  │  │  │  │  ├─ index.tsx
│  │  │  │  │  └─ reset-password.screen.tsx
│  │  │  │  ├─ login
│  │  │  │  │  ├─ index.tsx
│  │  │  │  │  └─ login.screen.tsx
│  │  │  │  └─ registration
│  │  │  │     ├─ country-selection.screen.tsx
│  │  │  │     ├─ form-provider
│  │  │  │     │  └─ registration-form-provider.tsx
│  │  │  │     ├─ index.ts
│  │  │  │     └─ registration.screen.tsx
│  │  │  ├─ types.ts
│  │  │  └─ _partials
│  │  │     ├─ auth-screen-title.tsx
│  │  │     └─ index.ts
│  │  └─ user
│  │     ├─ schema
│  │     │  └─ index.ts
│  │     ├─ screens
│  │     │  └─ user-center
│  │     │     ├─ index.tsx
│  │     │     ├─ settings
│  │     │     │  ├─ my-info
│  │     │     │  │  ├─ kyc
│  │     │     │  │  └─ security
│  │     │     │  │     ├─ authenticator-app
│  │     │     │  │     │  ├─ toggle-authenticator-app.tsx
│  │     │     │  │     │  └─ _partials
│  │     │     │  │     │     └─ setup-modal.tsx
│  │     │     │  │     ├─ index.tsx
│  │     │     │  │     └─ password.screen.tsx
│  │     │     │  ├─ preferences
│  │     │     │  │  └─ appearance.screen.tsx
│  │     │     │  └─ settings.screen.tsx
│  │     │     └─ user-center.tsx
│  │     ├─ types.ts
│  │     └─ _partials
│  │        └─ profile-header.tsx
│  └─ shared
│     ├─ copy-buton.tsx
│     ├─ header.tsx
│     ├─ layouts
│     │  └─ page.tsx
│     ├─ loader.tsx
│     ├─ modal.tsx
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
│     │  ├─ query-provider.tsx
│     │  └─ theme-provider
│     │     ├─ hooks
│     │     │  └─ index.ts
│     │     └─ theme-provider.tsx
│     └─ ui
│        ├─ avatar.tsx
│        ├─ bagde.tsx
│        ├─ button
│        │  ├─ button.styled.ts
│        │  ├─ button.tsx
│        │  └─ index.ts
│        ├─ flex.tsx
│        ├─ icon.tsx
│        ├─ input
│        │  ├─ index.ts
│        │  ├─ input.styled.ts
│        │  └─ input.tsx
│        ├─ list
│        │  └─ data-list.tsx
│        ├─ menu-list-item.tsx
│        ├─ qr-code.tsx
│        ├─ select-input.tsx
│        ├─ skeleton.tsx
│        ├─ spinner.tsx
│        ├─ switch.tsx
│        ├─ tabbed-view.tsx
│        ├─ text.tsx
│        └─ toaster.tsx
├─ constants
│  ├─ common.ts
│  └─ exceptions.ts
├─ eslint.config.js
├─ libs
│  ├─ api
│  │  ├─ client.ts
│  │  ├─ index.ts
│  │  ├─ middlewares
│  │  │  ├─ auth.middleware.ts
│  │  │  └─ index.ts
│  │  └─ schema.ts
│  ├─ config
│  │  ├─ app-config.ts
│  │  ├─ index.ts
│  │  └─ toast-config.tsx
│  ├─ store
│  │  ├─ index.ts
│  │  ├─ use-app.store.ts
│  │  └─ use-auth.store.ts
│  └─ utils
│     ├─ index.ts
│     ├─ map-server-errors.ts
│     ├─ print-json.ts
│     └─ toast.ts
├─ package.json
├─ README.md
├─ styles
│  ├─ colors.ts
│  ├─ index.ts
│  └─ theme
│     ├─ index.ts
│     └─ theme.ts
├─ tree.md
├─ tsconfig.json
└─ types
   └─ index.d.ts

```