# Interactive Wall Calendar Component

## Frontend Engineering Challenge
This project is an implementation of an interactive React/Next.js wall calendar component. It replicates the functionality and aesthetic of a physical wall calendar, allowing users to scroll or "flip" between months, select a start and end date across the calendar grid, and take notes.

### Core Requirements Implemented
- **Wall Calendar Aesthetic**: Features a prominent hero image next to a responsive grid representing the current month.
- **Day Range Selector**: Click intuitive start and end dates with highlighted connections for the duration selected.
- **Integrated Notes Section**: A functional notes area allowing users to attach memos.
- **Fully Responsive Design**:
  - **Desktop**: Side-by-side view with calendar/notes next to the featured image.
  - **Mobile**: Stacks gracefully, hiding the visual image section to focus on core functionality as requested.

### Extra Features / "Creative Liberty"
- **Flipping Animations**: Emulates the action of "flipping" to the next month on a real physical wall calendar with polished `framer-motion` 3D spring animations.
- **Persistent State**: The current date range selection and all entered notes persist using `localStorage`. 

## Architecture & Choices
- **Next.js & React**: Utilizing React for reactive states, functional components, and Hooks (`useState`, `useEffect`) alongside Next.js for efficient application scaffolding.
- **Tailwind CSS**: Chose Tailwind for rapid UI styling, avoiding large external CSS files. The use of grid and flexbox allows seamless breakpoint adjustment between desktop (`md:block`, `md:flex-row`) and mobile stacking layouts.
- **Date Handling**: The `date-fns` library provides lightweight, robust date manipulation logic (`addMonths`, `subMonths`, `format`, etc.).
- **Animation**: `framer-motion` was integrated to supply fluid entrance and exit sequences via `AnimatePresence`. 
- **Icons**: Used `lucide-react` for simple, scalable SVG iconography.

## How to Run Locally
1. Clone this repository to your local machine.
2. Navigate to the project directory:
   ```bash
   cd my-app
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your web browser. 
