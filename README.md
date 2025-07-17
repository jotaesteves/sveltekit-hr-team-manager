# SvelteKit HR Team Manager

A modern, comprehensive HR management application built with SvelteKit, TypeScript, and Tailwind CSS. This application provides a complete solution for managing team performance, conducting reviews, and tracking employee development.

## 🚀 Features

### 📊 **Performance Management**

- **Performance Grid**: Interactive 9-box performance matrix with drag-and-drop functionality
- **Evaluation Criteria**: Customizable performance evaluation metrics
- **Performance Reviews**: Structured review process with scoring and feedback
- **Weighted Scoring**: Automatic calculation of weighted performance scores

### 👥 **Team Management**

- **People Directory**: Comprehensive employee management
- **One-on-One Meetings**: Schedule and track individual meetings
- **Feedback System**: Continuous feedback collection and management
- **Role-based Access**: Different views and permissions based on roles

### 🔧 **Data Management**

- **Import/Export**: Bulk data operations with CSV/Excel support
- **CRUD Operations**: Full create, read, update, delete functionality
- **Expandable Tables**: Handle large text content with expandable rows
- **Data Validation**: Robust form validation and error handling

### 🌐 **Internationalization**

- **Multi-language Support**: English, German, Dutch, Portuguese
- **ParaglideJS Integration**: Type-safe i18n with compile-time optimization
- **Locale-aware Formatting**: Dates, numbers, and currency formatting

### 🎨 **Modern UI/UX**

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Mode Support**: System preference detection and manual toggle
- **Component Library**: Custom UI components with shadcn/ui integration
- **Interactive Elements**: Drag-and-drop, hover effects, animations

## 🛠️ Tech Stack

- **Frontend**: SvelteKit 2.x with Svelte 5.x
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.x with PostCSS
- **Icons**: Lucide Svelte
- **Internationalization**: ParaglideJS with Inlang
- **Testing**: Playwright (E2E), Vitest (Unit)
- **Code Quality**: ESLint, Prettier
- **Package Manager**: pnpm

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd sveltekit-hr-team-manager

# Install dependencies
pnpm install
```

## 🏃‍♂️ Development

```bash
# Start development server
pnpm run dev

# Start with auto-open browser
pnpm run dev -- --open

# Type checking
pnpm run check

# Watch mode for type checking
pnpm run check:watch
```

## 🔧 Building

```bash
# Create production build
pnpm run build

# Preview production build
pnpm run preview
```

## 🧪 Testing

```bash
# Run all tests
pnpm run test

# Run E2E tests only
pnpm run test:e2e

# Run unit tests only
pnpm run test:unit

# Run unit tests in watch mode
pnpm run test:unit -- --watch
```

## 📝 Code Quality

```bash
# Lint code
pnpm run lint

# Format code
pnpm run format
```

## 📁 Project Structure

```text
src/
├── lib/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Base UI components (table, etc.)
│   │   ├── Grid/           # Performance grid components
│   │   ├── Header/         # Application header
│   │   └── Sidebar/        # Navigation sidebar
│   ├── hooks/              # Custom Svelte hooks
│   ├── paraglide/          # Generated i18n files
│   └── utils.ts            # Utility functions
├── routes/                 # SvelteKit routes
│   ├── grid/              # Performance matrix page
│   ├── people/            # Employee management
│   ├── feedback/          # Feedback system
│   ├── one-on-one/        # Meeting management
│   ├── performance-reviews/ # Review system
│   ├── evaluation-criterias/ # Criteria management
│   ├── import-export/     # Data operations
│   ├── modules/           # Module management
│   ├── settings/          # Application settings
│   └── tutorial/          # Help and tutorials
├── stores/                # Svelte stores for state management
└── app.html              # HTML template
```

## 🌍 Internationalization

The application supports multiple languages through ParaglideJS:

- **English** (en)
- **German** (de)
- **Dutch** (nl)
- **Portuguese** (pt)

Language files are located in the `messages/` directory and compiled automatically during development.

## 🎯 Key Components

### Performance Grid

Interactive 9-box matrix for plotting employee performance vs potential with:

- Drag-and-drop employee positioning
- Real-time score updates
- Visual feedback and role indicators
- Customizable scales and dimensions

### CRUD Table

Advanced data table component featuring:

- Expandable rows for long content
- Inline editing capabilities
- Sorting and filtering
- Bulk operations
- CSV export functionality

### Navigation

Organized sidebar navigation with sections:

- **Core Features**: Dashboard, Performance Grid, People, Criteria, Reviews
- **Workflow**: Feedback, One-on-One, Performance Reviews  
- **Management**: Import/Export, Modules, Settings
- **Help**: Tutorial and documentation

## 🚀 Deployment

The application is built with SvelteKit's adapter-auto, which automatically selects the appropriate adapter for your deployment platform.

Popular deployment options:

- **Vercel**: Zero-config deployment
- **Netlify**: Static site hosting
- **Node.js**: Self-hosted with adapter-node
- **Docker**: Containerized deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Links

- [SvelteKit Documentation](https://kit.svelte.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ParaglideJS](https://inlang.com/m/gerre34r/library-inlang-paraglideJs)
- [Playwright Testing](https://playwright.dev/)

---

> Built with ❤️ using SvelteKit and modern web technologies
