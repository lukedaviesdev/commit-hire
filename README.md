# Job Search Application

A modern, responsive job search and listing application built with React 18, TypeScript, and TanStack Router. This application provides an intuitive interface for browsing, filtering, and viewing detailed information about job opportunities.

## 🌟 Features

### 🔍 Job Search & Filtering
- **Advanced Search**: Search across job titles, company names, and tags
- **Location Filtering**: Filter jobs by specific locations or view all
- **Tag-based Filtering**: Filter by technology stack, work type, and categories
- **Real-time Filtering**: Instant results as you type and select filters
- **URL State Management**: Shareable URLs with filter states
- **Saved Jobs Filter**: Toggle to show only bookmarked/saved jobs

### 💼 Job Browsing
- **Responsive Grid Layout**: Optimized display for desktop, tablet, and mobile
- **Interactive Job Cards**: Hover effects and smooth transitions
- **Search Highlighting**: Visual highlighting of search terms in results
- **Empty State Handling**: Graceful handling when no jobs match filters
- **Job Bookmarking**: Save/unsave jobs with persistent local storage
- **Multi-tab Sync**: Bookmark changes sync across browser tabs

### 📋 Job Details
- **Modal Interface**: Clean, accessible modal overlay for job details
- **Detailed Information**: Complete job descriptions, requirements, and company info
- **Tag Display**: Visual representation of technology stack and job categories
- **Keyboard Navigation**: Full keyboard support with ESC to close
- **Focus Management**: Accessible focus restoration when closing modals

### 🚀 Performance & UX
- **Server State Management**: Efficient data fetching with TanStack Query
- **Loading States**: Smooth loading indicators and transitions
- **Error Handling**: Graceful error states with retry capabilities
- **Motion Animations**: Smooth page transitions and micro-interactions
- **Responsive Design**: Mobile-first design with Tailwind CSS

## 📁 Project Structure

```
src/
├── components/
│   ├── jobs/
│   │   ├── job-card/           # Individual job card components
│   │   ├── job-details-modal/  # Modal for detailed job view
│   │   ├── job-filters/        # Search and filter components
│   │   └── job-list/          # Job listing and grid layout
│   ├── common/                # Shared components (spinners, motion wrappers)
│   ├── ui/                    # Base UI components (buttons, forms, dialogs)
│   └── ...
├── hooks/
│   ├── use-jobs.ts            # Job data fetching hook
│   ├── use-job-by-id.ts       # Individual job fetching hook
│   ├── use-filtered-jobs.ts   # Client-side filtering logic
│   ├── use-saved-jobs.ts      # Local storage job bookmarking hook
│   ├── use-local-storage/     # Generic local storage hook with SSR safety
│   └── ...
├── pages/
│   ├── home.tsx               # Landing page
│   ├── jobPage.tsx           # Jobs listing page with outlet for modals
│   └── ...
├── routes/
│   ├── __root.tsx            # Root layout with navigation
│   ├── jobs.tsx              # Jobs listing route with search params
│   ├── jobs.$jobId.tsx       # Individual job detail modal route
│   └── ...
├── types/
│   └── job.ts                # Job-related TypeScript interfaces
├── lib/
│   └── api.ts                # API functions for job data fetching
└── public/
    └── mock/
        └── jobs.json         # Mock job data
```

## 🛠️ Technology Stack

### Core Framework
- **React 18** - Latest React with concurrent features
- **TypeScript** - Full type safety throughout the application
- **Vite** - Fast development server and optimized builds

### Routing & State Management
- **TanStack Router** - Type-safe routing with search params and nested routes
- **TanStack Query** - Server state management, caching, and data fetching
- **React Hook Form** - Efficient form state management
- **Zod** - Runtime type validation for forms and data

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **ShadCN/ui** - High-quality, accessible component library built on Radix UI
- **Motion** - Smooth animations and page transitions
- **Lucide React** - Beautiful, customizable icons

### Development Tools
- **ESLint** - Code linting with comprehensive rules
- **Prettier** - Code formatting
- **Husky** - Git hooks for code quality
- **Vitest** - Fast unit testing
- **TypeScript ESLint** - TypeScript-specific linting

## 🚦 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd commit-hire
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier
- `npm run lint:fix` - Fix linting and formatting issues
- `npm test` - Run tests in watch mode
- `npm run test:ui` - Run tests with Vitest UI
- `npm run test:coverage` - Run tests with coverage report
- `npm run type-check` - Run TypeScript type checking

## 🗺️ Application Routes

- `/` - Home page
- `/jobs` - Job listings with search and filters
- `/jobs/:jobId` - Job detail modal (overlays the jobs page)
- `/login` - Login page (placeholder)

## 🎯 Key Features Deep Dive

### Job Bookmarking System
The application includes a comprehensive job bookmarking system that:
- **Local Storage Persistence**: Saves bookmarked jobs locally with automatic persistence
- **Multi-tab Synchronization**: Changes sync instantly across all open browser tabs
- **SSR Safe**: Handles server-side rendering without hydration mismatches
- **Visual Feedback**: Clear bookmark icons show save state (filled/outlined)
- **Accessible Interface**: Keyboard navigation and screen reader support
- **Filter Integration**: "Show saved jobs only" checkbox to view bookmarked jobs
- **URL State**: Filter state persists in shareable URLs

The bookmarking feature is built with:
- `useSavedJobs()` hook providing `isSaved()`, `toggleSave()`, and `savedIds` array
- Generic `useLocalStorage()` hook with cross-tab synchronization
- Integration with existing filter system and URL state management
- Consistent styling using ShadCN/ui components

### Smart Filtering System
The application implements a sophisticated filtering system that:
- Maintains filter state in the URL for shareability
- Provides real-time search across multiple job fields
- Handles edge cases like empty searches and missing data
- Preserves user selections when navigating

### Modal-based Job Details
Job details are displayed in an accessible modal that:
- Overlays the job listings (preserving context)
- Supports direct URL access (e.g., `/jobs/job-4`)
- Manages focus and keyboard navigation
- Provides smooth animations for better UX

### Type-Safe Development
The entire application is built with TypeScript:
- Strong typing for all job data structures
- Type-safe routing with TanStack Router
- Validated search parameters and form inputs
- Runtime type checking with Zod schemas

### Responsive Design
Built mobile-first with:
- Adaptive grid layouts that work on all screen sizes
- Touch-friendly interactive elements
- Optimized typography and spacing
- Accessible color contrast and focus states

## 🧪 Testing Strategy

The application includes:
- Component testing with React Testing Library
- Custom test utilities for consistent testing patterns
- Coverage reporting for code quality metrics
- Automated testing in CI/CD pipeline

## 🔧 Customization

### Using the Bookmarking Feature
**For Users:**
1. Click the bookmark icon on any job card to save/unsave jobs
2. Use the "Show saved jobs only" checkbox in filters to view bookmarked jobs
3. Bookmark state persists across browser sessions and tabs
4. Filter state including saved jobs filter is shareable via URL

**For Developers:**
```typescript
import { useSavedJobs } from '@/hooks/use-saved-jobs';

// In your component
const { savedIds, isSaved, toggleSave } = useSavedJobs();

// Check if a job is saved
const isJobSaved = isSaved('job-id');

// Toggle save status
toggleSave('job-id');

// Get all saved job IDs
console.log(savedIds); // ['job-1', 'job-3', ...]
```

### Adding New Job Fields
1. Update the `Job` interface in `src/types/job.ts`
2. Modify the job card component to display new fields
3. Update the job details modal content
4. Add filtering logic if needed

### Styling Customization
- Modify `tailwind.config.js` for theme customization
- Update component variants in the UI component library
- Customize animations in the motion wrapper components

### API Integration
Currently uses mock data from `public/mock/jobs.json`. To integrate with a real API:
1. Update `src/lib/api.ts` with your API endpoints
2. Modify the data fetching functions
3. Update error handling for network failures
4. Add authentication if required

## 🚀 Deployment

The application is optimized for deployment on:
- **Vercel** - Zero-config deployment with optimal performance
- **Netlify** - Easy static site deployment
- **Traditional hosting** - Build outputs standard static files

Build the application for production:
```bash
npm run build
```

The `dist` folder contains the optimized application ready for deployment.

## 🤝 Contributing

1. Follow the existing code style and patterns
2. Write tests for new features
3. Update documentation as needed
4. Ensure all linting and type checks pass
5. Use the provided git hooks for quality assurance

---

Built with ❤️ using modern React patterns and best practices.
