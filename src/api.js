const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';

export const getCourses = async () => {
  try {
    const response = await fetch(`${BASE_URL}/courses/`);
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

export const submitEnquiry = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/enquiries/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit enquiry');
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error submitting enquiry:", error);
    throw error;
  }
};

export const submitBooking = async (bookingData) => {
  try {
    const response = await fetch(`${BASE_URL}/bookings/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit booking');
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error submitting booking:", error);
    throw error;
  }
};
