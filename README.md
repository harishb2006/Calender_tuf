# 📅 Interactive Wall Calendar Component

**Live Demo**: [https://calender-tuf-green.vercel.app/](https://calender-tuf-green.vercel.app/)

## 🚀 Frontend Engineering Challenge
This project is an implementation of an interactive React/Next.js wall calendar component. It elegantly replicates the physical aesthetic of a wall calendar while allowing users to:
- 🗓️ Scroll or "flip" between months
- 🖱️ Select start and end dates seamlessly across the grid
- 📝 Take persistent notes attached to the calendar

### ✨ Core Requirements Implemented
- **🖼️ Wall Calendar Aesthetic**: Features a prominent hero image next to a responsive grid representing the exact days of the current month.
- **🎯 Day Range Selector**: Intuitive click-to-highlight feature for start and end dates with clean CSS visual connections.
- **📓 Integrated Notes Section**: A beautifully functional notes area to jot down important memos.
- **📱 Fully Responsive Design**:
  - **🖥️ Desktop**: Expanded side-by-side view highlighting the visual cover art next to the actual calendar functions.
  - **📲 Mobile**: Stacks gracefully and completely hides the large imagery to provide immediate focus on the core calendar utility.

### 🎨 Extra Features & Creative Liberty
- **🎬 3D Flipping Animations**: Uses `framer-motion` spring animations to emulate the visceral feeling of "flipping" a solid wall calendar card.
- **💾 Persistent State Management**: The active selection dates and text notes remain securely saved through browser `localStorage`. 

## 🏗️ Architecture & Choices
- ⚛️ **Next.js & React**: Modern scaffolding backed by robust React hooks (`useState`, `useEffect`) without the overhead of external state managers.
- 💅 **Tailwind CSS**: Chose Tailwind for atomic styling, letting us easily toggle grid and flex setups by breakpoints (`md:block`, `md:flex-row`).
- 🕰️ **date-fns**: Selected for its incredibly durable and lightweight date logic vs traditional monolithic date libraries.
- ✨ **Framer Motion**: Makes the UI feel alive natively without massive custom animation wrappers. 
- 💠 **Lucide React**: Clean, scalable vector SVGs across the application.

## 🛠️ How to Run Locally

1. **Clone this repository** to your local machine.
2. **Navigate** to the project folder:
   ```bash
   cd my-app
   ```
3. **Install the dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm run dev
   ```
5. 🌐 Open [http://localhost:3000](http://localhost:3000) in your web browser. 
