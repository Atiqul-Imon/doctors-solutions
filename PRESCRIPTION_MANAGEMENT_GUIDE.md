# Prescription Management System Guide

## Overview

The prescription management system has been fully integrated with the existing patient management features. This comprehensive guide explains how the system works and how to use it effectively.

## Features Implemented

### 1. **Database Models**

#### Prescription Model (`lib/models/Prescription.ts`)
- **Auto-generated prescription numbers**: Format `PRS-YYYY-MM-XXXXX` (e.g., PRS-2024-11-00001)
- **Patient linkage**: Links to Patient via `patientId`
- **Visit integration**: Optional link to visit notes via `visitNoteId`
- **Medications array**: Stores multiple medications with dosage, frequency, duration, and instructions
- **Status tracking**: `active`, `completed`, `cancelled`
- **Renewal system**: Tracks renewal count and refillable status
- **Expiry management**: Optional expiry date for prescriptions

#### PrescriptionTemplate Model (`lib/models/PrescriptionTemplate.ts`)
- **Template management**: Save common medication combinations
- **Categories**: `general`, `fever`, `cold`, `infection`, `pain`, `allergy`, `chronic`, `other`
- **Usage tracking**: Counts how many times each template has been used
- **Medication structure**: Same as Prescription medications for consistency

### 2. **API Routes**

#### Prescriptions API (`/api/prescriptions`)
- **GET**: List prescriptions with filters (patientId, status, date, pagination)
- **POST**: Create new prescription

#### Prescription Details API (`/api/prescriptions/[id]`)
- **GET**: Get single prescription details
- **PATCH**: Update prescription (status, notes, instructions)
- **DELETE**: Cancel prescription (sets status to cancelled)

#### Prescription Actions API
- **POST `/api/prescriptions/[id]/renew`**: Renew prescription (increment count, update expiry)
- **GET `/api/prescriptions/[id]/print`**: Generate and download PDF

#### Prescription Templates API (`/api/prescription-templates`)
- **GET**: List templates with filters (category, search)
- **POST**: Create new template
- **PATCH**: Update template
- **DELETE**: Delete template

### 3. **UI Components**

#### Patient Detail Page - Prescriptions Tab
- **Location**: Patient Detail Page → "Prescriptions" tab
- **Features**:
  - List all prescriptions for the patient
  - View prescription details (status, date, medications count)
  - Print/Download PDF button
  - Renew prescription button (for active and refillable prescriptions)
  - Create new prescription button

#### Prescription Creation Modal
- **Access**: 
  - From "Prescriptions" tab → "New Prescription" button
  - From "Visit Notes" tab → "Create Prescription" button on each visit note
- **Features**:
  - Template selector (dropdown to load saved templates)
  - Medication builder (add/remove multiple medications)
  - Auto-fill when creating from visit note (uses visit date and doctor)
  - Additional instructions textarea
  - Refillable checkbox
  - Expiry date selector
  - Notes field

#### Prescription Detail Modal
- **Features**:
  - Full prescription view with all medications
  - Renewal history display
  - Print/Download PDF button
  - Renew button (if refillable and active)
  - Status information

#### Prescription Templates Page (`/dashboard/prescription-templates`)
- **Location**: Admin Dashboard → Sidebar → "Prescription Templates"
- **Features**:
  - List all templates with category badges
  - Search and filter by category
  - Create/Edit/Delete templates
  - Usage statistics (how many times used)
  - Template cards showing medications count

### 4. **PDF Generation**

#### PDF Service (`lib/services/prescriptionPdf.ts`)
- **Professional formatting**: Clinic header, doctor credentials, patient info
- **Medications table**: Organized display of all medications
- **Prescription details**: Number, date, status, expiry, renewals
- **Signature area**: Space for doctor signature
- **Download format**: PDF file with proper filename

### 5. **Integration Points**

#### Patient Medications Array Sync
- **Automatic sync**: When a prescription is created, medications are automatically added to the patient's `medications` array
- **Linked data**: Medications include start date, end date (from expiry), and prescribed by information
- **Benefits**: Prescription medications appear in the patient's active medications list

#### Visit Notes Integration
- **Create from visit**: "Create Prescription" button in each visit note
- **Auto-fill**: Automatically fills prescription date and doctor name from visit note
- **Linkage**: Prescription is linked to the visit note via `visitNoteId`
- **Context**: Prescription notes can be pre-filled with visit notes

## How It Works

### Creating a Prescription

1. **From Patient Detail Page**:
   - Navigate to Patient Detail → Prescriptions tab
   - Click "New Prescription" button
   - Fill in prescription details
   - Add medications using the medication builder
   - Optionally select a template to pre-fill medications
   - Save the prescription

2. **From Visit Notes**:
   - Navigate to Patient Detail → Visit Notes tab
   - Find the visit note for which you want to create a prescription
   - Click "Create Prescription" button on that visit note
   - Prescription form opens with auto-filled date and doctor
   - Prescription will be linked to that visit note
   - Add medications and save

### Using Templates

1. **Create Template**:
   - Go to Dashboard → Prescription Templates
   - Click "New Template"
   - Fill in template name, category, and description
   - Add medications to the template
   - Add default instructions
   - Save template

2. **Use Template**:
   - When creating a prescription, select a template from the dropdown
   - Medications and instructions will be auto-filled
   - You can modify or add more medications before saving

### Printing Prescriptions

1. **From Prescription List**:
   - Click the printer icon on any prescription card
   - PDF will be generated and downloaded automatically

2. **From Prescription Detail**:
   - Open prescription detail modal
   - Click "Print/Download PDF" button
   - Professional PDF with all details will be generated

### Renewing Prescriptions

1. Open prescription detail modal
2. Click "Renew" button (only available for active and refillable prescriptions)
3. Enter new expiry date if needed
4. System increments renewal count and updates status

## Data Flow

### Prescription Creation Flow

```
User creates prescription
  ↓
API validates data
  ↓
Prescription document created (with auto-generated number)
  ↓
Medications synced to Patient.medications array
  ↓
Prescription saved to database
  ↓
Patient and Prescriptions lists refreshed
```

### Prescription Print Flow

```
User clicks Print button
  ↓
API fetches prescription with patient data
  ↓
PDF generation service creates formatted PDF
  ↓
PDF buffer converted to Uint8Array
  ↓
Response sent as downloadable PDF file
  ↓
Browser downloads file
```

### Template Usage Flow

```
User selects template from dropdown
  ↓
API fetches template (increments usage count)
  ↓
Template medications and instructions loaded into form
  ↓
User can modify or add medications
  ↓
Prescription created with template data (if template was used)
```

## Integration with Current Patient Management

### How Prescriptions Connect to Existing Features

1. **Patient Medications Tab**:
   - When a prescription is created, medications automatically appear in the "Medications" tab
   - Shows prescribed date, dosage, frequency, and prescribed by information
   - Links back to prescription via metadata (if needed in future)

2. **Visit Notes Tab**:
   - Each visit note can have a linked prescription
   - "Create Prescription" button allows quick prescription creation
   - Prescription date and doctor auto-filled from visit

3. **Patient Overview**:
   - Prescription count could be added to Quick Stats (future enhancement)
   - Shows relationship between visits and prescriptions

4. **Search & Filter**:
   - Prescriptions can be searched by patient, prescription number, medication name
   - Filtered by date range, status, refillable status

## Prescription Numbering System

- **Format**: `PRS-YYYY-MM-XXXXX`
- **Example**: `PRS-2024-11-00001`
- **Auto-generation**: Handled by Mongoose pre-save hook
- **Uniqueness**: Ensured by database unique index
- **Sequential**: Numbers increment per month
- **Reset**: Sequence resets each month

## Benefits of This Implementation

1. **Seamless Integration**: Prescriptions work naturally with existing patient data
2. **Time Saving**: Templates speed up common prescriptions
3. **Professional Output**: PDF generation for printing/pharmacy submission
4. **History Tracking**: Complete prescription history per patient
5. **Renewal Management**: Track refills and renewals easily
6. **Visit Context**: Link prescriptions to specific visits for better record keeping
7. **Medication Sync**: Automatic synchronization with patient's medication list

## Usage Tips

1. **Create Templates First**: Set up common prescription templates for frequently used medication combinations
2. **Link to Visits**: Always create prescriptions from visit notes when possible for better context
3. **Use Expiry Dates**: Set expiry dates for time-sensitive prescriptions
4. **Mark Refillable**: Enable refillable flag for medications that can be renewed
5. **Add Instructions**: Always include additional instructions for clarity
6. **Print Immediately**: Print prescriptions right after creation for patient handoff

## Future Enhancements (Optional)

1. **Email/SMS Integration**: Send prescription PDF to patient via email or SMS
2. **Pharmacy Integration**: Direct prescription sending to pharmacies
3. **Drug Interaction Checks**: Warning system for medication interactions
4. **Prescription History Analytics**: Track commonly prescribed medications
5. **Batch Prescription Printing**: Print multiple prescriptions at once
6. **Prescription Renewal Reminders**: Automated reminders for expiring prescriptions

## Technical Details

### Database Schema
- **Prescription**: Separate collection with indexes on patientId, prescriptionNumber, date
- **PrescriptionTemplate**: Separate collection with category and usage tracking
- **Patient**: Medications array remains for backward compatibility and quick access

### API Security
- All prescription APIs require admin authentication
- Protected by `withAuth` middleware
- Only authorized users can create/read/update prescriptions

### PDF Generation
- Uses `pdfkit` library for server-side PDF generation
- Professional formatting with clinic branding
- Includes all necessary prescription details
- Supports Bangla text (can be added if needed)

## Navigation

- **Admin Dashboard → Prescription Templates**: Manage templates
- **Patient Detail → Prescriptions Tab**: View and create prescriptions for specific patient
- **Patient Detail → Visit Notes Tab**: Create prescription linked to visit

The prescription management system is now fully operational and integrated with your existing patient management features!

