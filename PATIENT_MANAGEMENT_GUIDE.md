# Patient Data Management Guide

## Overview

The patient data management system allows doctors to maintain comprehensive medical records for each patient. All information is stored securely and can be accessed anytime for reference during consultations.

## Accessing Patient Records

1. **Navigate to Patients:**
   - Go to `/dashboard/patients` in the admin panel
   - Or click "Patients" in the sidebar navigation

2. **Search for a Patient:**
   - Use the search bar to find patients by:
     - Name
     - Email address
     - Phone number

3. **View Patient Details:**
   - Click "View Details" button on any patient
   - This opens the comprehensive patient management page

## Patient Information Tabs

### 1. Overview Tab
**Basic patient information and quick stats**

- **Personal Information:**
  - First Name, Last Name
  - Email, Phone
  - Date of Birth
  - Gender
  - Blood Group
  - Address
  - Emergency Contact

- **Quick Stats:**
  - Number of medical conditions
  - Number of allergies
  - Active medications count
  - Total visits

- **General Notes:**
  - Free-form notes about the patient
  - Can be edited when in edit mode

### 2. Medical History Tab
**Track all medical conditions and diagnoses**

- **Add Medical Condition:**
  1. Click "Edit Patient" button
  2. Click "Add Condition" button
  3. Fill in:
     - Condition name (required)
     - Status: Active, Resolved, or Chronic
     - Diagnosed date
     - Notes
     - Doctor who diagnosed
  4. Click "Add" to save

- **View Medical History:**
  - All conditions displayed with status badges
  - Color-coded by status:
    - Red: Active
    - Yellow: Chronic
    - Green: Resolved

### 3. Allergies Tab
**Record patient allergies and reactions**

- **Add Allergy:**
  1. Enter edit mode
  2. Click "Add Allergy"
  3. Fill in:
     - Allergen name (required)
     - Reaction description (required)
     - Severity: Mild, Moderate, or Severe
     - Additional notes
  4. Save

- **Important:** Allergies are highlighted in red for visibility

### 4. Medications Tab
**Track current and past medications**

- **Add Medication:**
  1. Enter edit mode
  2. Click "Add Medication"
  3. Fill in:
     - Medication name (required)
     - Dosage (required)
     - Frequency (required)
     - Start date
     - End date (if applicable)
     - Prescribed by
     - Notes
  4. Save

- **Active Medications:**
  - Only medications without an end date or with future end dates are shown
  - Past medications are archived

### 5. Vital Signs Tab
**Record and track vital signs over time**

- **Add Vital Signs:**
  1. Enter edit mode
  2. Click "Add Vital Signs"
  3. Fill in:
     - Date (defaults to today)
     - Blood Pressure (e.g., 120/80)
     - Heart Rate (bpm)
     - Temperature (°F)
     - Weight (kg)
     - Height (cm) - BMI calculated automatically
     - Notes
  4. Save

- **View History:**
  - Table format showing all recorded vital signs
  - Sorted by date (newest first)

### 6. Lab Results Tab
**Store laboratory test results**

- **Add Lab Result:**
  1. Enter edit mode
  2. Click "Add Lab Result"
  3. Fill in:
     - Test name (required)
     - Test date (required)
     - Results (required)
     - Normal range
     - Status: Normal, Abnormal, or Critical
     - Notes
  4. Save

- **Status Indicators:**
  - Green: Normal
  - Yellow: Abnormal
  - Red: Critical

### 7. Visit Notes Tab
**Document each patient visit**

- **Add Visit Note:**
  1. Enter edit mode
  2. Click "Add Visit Note"
  3. Fill in:
     - Visit date (required)
     - Chief complaint (required)
     - Diagnosis (required)
     - Treatment (required)
     - Detailed notes
     - Doctor name
     - Follow-up date (if needed)
  4. Save

- **Visit History:**
  - All visits displayed chronologically
  - Most recent visits first
  - Includes follow-up dates

### 8. Family History Tab
**Record family medical history**

- **Add Family History:**
  1. Enter edit mode
  2. Click "Add Family History"
  3. Fill in:
     - Condition (required)
     - Relation (required, e.g., Father, Mother)
     - Age of onset
     - Notes
  4. Save

### 9. Insurance Tab
**Store insurance information**

- **Edit Insurance Info:**
  1. Enter edit mode
  2. Fill in:
     - Insurance provider
     - Policy number
     - Group number
     - Expiry date
  3. Click "Save Changes"

## Editing Patient Information

### Basic Information
1. Click "Edit Patient" button (top right)
2. Modify any fields in the Overview tab
3. Click "Save Changes"

### Adding New Records
1. Click "Edit Patient" button
2. Navigate to the relevant tab
3. Click the "Add [Item]" button
4. Fill in the form
5. Click "Add" to save

### Editing Existing Records
- Currently, records can be viewed in detail
- Full edit functionality for individual items coming soon
- For now, you can add new entries to update records

## Data Management Best Practices

### 1. Regular Updates
- Update patient records after each visit
- Add visit notes immediately after consultation
- Record vital signs during each visit

### 2. Complete Information
- Fill in all available fields for comprehensive records
- Add notes for context and future reference
- Include dates for all medical events

### 3. Accuracy
- Double-check medication dosages
- Verify lab result values
- Ensure dates are correct

### 4. Privacy
- All patient data is stored securely
- Only authorized admin users can access
- Data is encrypted in transit and at rest

## Quick Reference

| Action | Steps |
|--------|-------|
| View Patient | Patients → Search → View Details |
| Edit Basic Info | View Details → Edit Patient → Make Changes → Save |
| Add Medical Condition | Edit Patient → Medical History → Add Condition |
| Add Allergy | Edit Patient → Allergies → Add Allergy |
| Add Medication | Edit Patient → Medications → Add Medication |
| Record Vital Signs | Edit Patient → Vital Signs → Add Vital Signs |
| Add Lab Result | Edit Patient → Lab Results → Add Lab Result |
| Add Visit Note | Edit Patient → Visit Notes → Add Visit Note |
| Add Family History | Edit Patient → Family History → Add Family History |

## Features

✅ **Comprehensive Data Storage:**
- Personal information
- Medical history
- Allergies and reactions
- Current and past medications
- Vital signs tracking
- Lab results
- Visit notes and history
- Family medical history
- Insurance information

✅ **Easy Navigation:**
- Tabbed interface for organized data
- Quick stats overview
- Search functionality

✅ **Data Integrity:**
- Required field validation
- Date validation
- Automatic calculations (BMI)
- Status indicators

✅ **User-Friendly:**
- Clean, professional interface
- Modal forms for adding data
- Clear labels and instructions
- Responsive design

## API Endpoints

- `GET /api/patients/[id]` - Get patient details
- `PATCH /api/patients/[id]` - Update patient information
- `POST /api/patients/[id]/add-item` - Add item to patient record
- `PATCH /api/patients/[id]/update-item` - Update specific item
- `DELETE /api/patients/[id]/delete-item` - Delete specific item

## Notes

- All dates are stored in UTC and displayed in local timezone
- Medical history, allergies, and medications are stored as arrays
- Each entry can have multiple fields for comprehensive documentation
- Data is preserved when adding new entries
- Historical data is maintained for reference

For technical support or questions, refer to the main README.md file.

