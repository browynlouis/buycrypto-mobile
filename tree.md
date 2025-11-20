
```
buy-crypto-mobile
├─ .prettierignore
├─ .prettierrc
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
│  │  ├─ register
│  │  │  ├─ index.tsx
│  │  │  └─ _layout.tsx
│  │  └─ _layout.tsx
│  ├─ (protected)
│  │  ├─ (user-center)
│  │  │  ├─ index.tsx
│  │  │  └─ settings
│  │  │     ├─ general
│  │  │     │  ├─ kyc
│  │  │     │  └─ security
│  │  │     ├─ index.tsx
│  │  │     └─ preferences
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
├─ eslint.config.js
├─ features
│  ├─ auth
│  │  ├─ api
│  │  │  ├─ auth.mutation.ts
│  │  │  ├─ auth.query.ts
│  │  │  └─ index.ts
│  │  ├─ components
│  │  │  ├─ auth-screen-title.tsx
│  │  │  └─ verification-form.tsx
│  │  ├─ hooks
│  │  │  ├─ index.ts
│  │  │  └─ use-safe-auth.ts
│  │  ├─ schema
│  │  │  └─ auth.schema.ts
│  │  ├─ screens
│  │  │  ├─ forgot-password
│  │  │  │  ├─ index.tsx
│  │  │  │  └─ verify-request.tsx
│  │  │  ├─ index.ts
│  │  │  ├─ login-screen
│  │  │  │  ├─ index.tsx
│  │  │  │  └─ two-fa-auth.tsx
│  │  │  ├─ register-screen
│  │  │  │  ├─ email-verification.tsx
│  │  │  │  └─ index.tsx
│  │  │  └─ reset-password
│  │  │     └─ index.tsx
│  │  ├─ store
│  │  │  ├─ index.ts
│  │  │  └─ use-auth.store.ts
│  │  └─ types.ts
│  └─ user
├─ libs
│  ├─ api
│  │  ├─ api.ts
│  │  ├─ index.ts
│  │  ├─ middlewares
│  │  │  ├─ auth.middleware.ts
│  │  │  └─ store.middleware.ts
│  │  ├─ schema.ts
│  │  └─ store
│  │     └─ use-api.store.ts
│  ├─ hooks
│  │  ├─ index.ts
│  │  └─ use-theme.ts
│  └─ utils
│     ├─ map-server-errors.ts
│     └─ toast.ts
├─ package.json
├─ README.md
├─ shared
│  ├─ components
│  │  ├─ header.tsx
│  │  ├─ layouts
│  │  │  └─ page.tsx
│  │  ├─ loader.tsx
│  │  ├─ modal.tsx
│  │  ├─ providers
│  │  │  ├─ auth-provider.tsx
│  │  │  ├─ index.ts
│  │  │  ├─ query-provider.tsx
│  │  │  ├─ theme-provider.tsx
│  │  │  └─ toast-provider.tsx
│  │  └─ ui
│  │     ├─ button
│  │     │  ├─ button.styled.ts
│  │     │  ├─ button.tsx
│  │     │  └─ index.ts
│  │     ├─ icon.tsx
│  │     ├─ input
│  │     │  ├─ index.ts
│  │     │  ├─ input.styled.ts
│  │     │  └─ input.tsx
│  │     ├─ spinner.tsx
│  │     ├─ text.tsx
│  │     └─ toaster.tsx
│  └─ constants
│     ├─ common.ts
│     └─ exceptions.ts
├─ styles
│  ├─ colors.ts
│  ├─ index.ts
│  └─ theme
│     ├─ index.ts
│     └─ theme.ts
├─ tsconfig.json
└─ types
   └─ index.d.ts

```