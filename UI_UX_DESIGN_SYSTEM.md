# UI/UX Design System & Style Guide

---

This document defines the comprehensive design system for the **Technology Prompts Library App**. Its purpose is to ensure a consistent, high-quality, and uniform look and feel across all platforms (Web, iOS, and Android).

## 1. Core Design Principles

- **Clarity**: The interface should be clean, intuitive, and easy to navigate.
- **Consistency**: Elements should look and behave the same way everywhere.
- **Accessibility**: The design must be usable by people of all abilities (WCAG AA compliance).
- **Feedback**: The UI should provide clear feedback for user interactions (e.g., button presses, loading states).

---

## 2. Color Palette

| Role | Color Name | Hex Code | Usage |
| :--- | :--- | :--- | :--- |
| **Primary** | Blue | `#2196F3` | Main brand color, used for headers, primary buttons, and active states. |
| **Secondary** | Orange | `#FF9800` | Accent color, used for secondary actions, highlights, and progress indicators. |
| **Success** | Green | `#4CAF50` | Used for success messages, completion indicators, and validation. |
| **Error** | Red | `#F44336` | Used for error messages, warnings, and destructive action confirmation. |
| **Text/Primary** | Black | `#212121` | Main text color. |
| **Text/Secondary**| Grey | `#757575` | Secondary text, hints, and disabled states. |
| **Background** | White/Light Grey | `#FFFFFF` / `#F5F5F5` | Page and component backgrounds. |

---

## 3. Typography

- **Font Family**: **Roboto** will be used for all text across the application.
- **Scale**: The Material Design typography scale will be used to maintain a clear hierarchy.
    - **Headline 1-6**: For page titles and major headings.
    - **Subtitle 1-2**: For section titles and subheadings.
    - **Body 1-2**: For all primary content text.
    - **Button**: For all button labels.
    - **Caption**: For small helper text and captions.
    - **Overline**: For labels and category tags.

---

## 4. Spacing & Layout

- **Base Unit**: **8px**. All margins, paddings, and layout spacing will be multiples of 8px (8, 16, 24, 32, 48, 64px).
- **Layout Standards**:
    - **Header**: Fixed navigation bar at the top.
    - **Navigation**: Sidebar for desktop; Bottom Tab Bar for mobile.
    - **Content Area**: Scrollable main content with consistent padding (e.g., 16px on mobile, 24px on desktop).
    - **Footer**: Contains previous/next navigation and completion status.

---

## 5. Core Components & Styling

| Component | Style Details |
| :--- | :--- |
| **Buttons** | - **Radius**: 20px. <br> - **Effect**: Material Design ripple effect on click. <br> - **Types**: Raised (for primary actions), Flat (for secondary actions). |
| **Cards** | - **Radius**: 4px. <br> - **Elevation**: Use Material Design shadow system (2dp for standard, 8dp for hover). <br> - **Interaction**: Smooth transitions on hover. |
| **Forms** | - **Style**: Material text fields with floating labels. <br> - **Validation**: Real-time validation with clear error states. |
| **Modals/Dialogs**| - **Animation**: Smooth slide-in animations. <br> - **Backdrop**: Blurred background to focus the user's attention. |
| **Animations** | - **Micro-interactions**: 200ms duration (e.g., icon state changes). <br> - **Page Transitions**: 300ms duration. |

---

## 6. Component Libraries

- **CSS Common Components**: A library of custom-built, reusable CSS components will be created for elements like navigation bars, spinners, and progress bars.
- **Material Design Components**: Leverage pre-built Material Design components for buttons, cards, and navigation drawers to ensure consistency.
- **Mobile Platform Components**: Utilize native-equivalent components where necessary for platform-specific conventions (e.g., `RecyclerView` on Android, `UITableView` on iOS).
