# Google Maps Autocomplete Migration Guide

This document provides step-by-step instructions to migrate from Redux-based location search to native Google Maps Places Autocomplete (like in `CreatePage.jsx`).

## Overview

**Before:** Using Redux actions (`getLocation`, `getLocationDetails`) with react-select dropdown  
**After:** Direct Google Maps API integration with native autocomplete input and interactive map

## Benefits

- ✅ Native Google Autocomplete dropdown (better UX)
- ✅ Interactive map with marker visualization
- ✅ Real-time map updates
- ✅ No backend API calls needed
- ✅ Faster performance
- ✅ Same experience as CreatePage.jsx

---

## Step-by-Step Migration

### Step 1: Update Imports

**Remove:**
```javascript
import { useSelector } from 'react-redux';
import { getLocation } from '../../redux/actions/master/location/location';
import { getLocationDetails } from '../../redux/actions/master/location/locationDetail';
```

**Add:**
```javascript
import { useCallback } from 'react'; // Add useCallback if not already imported
```

**Keep:**
```javascript
import { useDispatch } from 'react-redux'; // Keep if needed for other actions
import { Controller, useForm } from 'react-hook-form';
import { Country, State, City } from 'country-state-city';
```

---

### Step 2: Add Google Maps Refs and State

**Add these refs and state variables** (after your existing state declarations):

```javascript
// Google Places Autocomplete refs and state
const autocompleteInputRef = React.useRef(null);
const autocompleteRef = React.useRef(null);
const mapRefForAutocomplete = React.useRef(null);
const markerRefForAutocomplete = React.useRef(null);
const [selectedPlaceAddress, setSelectedPlaceAddress] = useState("");
const [selectedPlaceLat, setSelectedPlaceLat] = useState("");
const [selectedPlaceLng, setSelectedPlaceLng] = useState("");
const [selectedPlaceId, setSelectedPlaceId] = useState("");
```

---

### Step 3: Add updateFormValues Callback

**Add this callback** (after your form hook initialization):

```javascript
// Update form values callback for Google Places
const updateFormValues = useCallback((formattedAddress, placeId, lat, lng) => {
    setSelectedPlaceAddress(formattedAddress);
    setSelectedPlaceLat(lat.toString());
    setSelectedPlaceLng(lng.toString());
    setSelectedPlaceId(placeId);
    setValue('location', placeId, { shouldValidate: false });
    setValue('googleSearchLocation', formattedAddress, { shouldValidate: false });
    setValue('googleSearchLat', lat.toString(), { shouldValidate: false });
    setValue('googleSearchLong', lng.toString(), { shouldValidate: false });
}, [setValue]);
```

---

### Step 4: Remove Old Redux Location Code

**Remove these useEffect hooks and selectors:**

```javascript
// ❌ REMOVE THIS:
useEffect(() => {
    if (location) {
        dispatch(getLocation(location));
    }
}, [dispatch, location]);

useEffect(() => {
    if (place_id) {
        dispatch(getLocationDetails(place_id));
    }
}, [dispatch, place_id]);

const store3 = useSelector((state) => state.locationsReducer) || { locations: [] };
const data3 = Array.isArray(store3?.locations) ? store3.locations : [];
const locationOptions = data3.map((item) => ({
    value: item.place_id,
    label: item.description,
}));

const store4 = useSelector((state) => state.locationDetailsReducer) || { locationDetails: [] };
const data4 = store4.locationDetails ? store4.locationDetails : [];
```

**Also remove:**
```javascript
const place_id = watch("location"); // Remove if not used elsewhere
const [location, setLocation] = useState(''); // Remove if not used elsewhere
```

---

### Step 5: Add Google Maps Initialization useEffect

**Add this complete useEffect hook** (replace the old location handling code):

```javascript
// Initialize Google Maps with Places Autocomplete
useEffect(() => {
    let isMounted = true;
    let autocompleteInstance = null;
    let markerInstance = null;
    let mapInstance = null;
    let retryCount = 0;
    const maxRetries = 10;

    const initializeAutocomplete = () => {
        if (autocompleteRef.current) {
            console.log("Autocomplete already initialized");
            return;
        }

        if (!window.google || !window.google.maps || !window.google.maps.places) {
            console.error("Google Maps API or Places library not loaded");
            if (retryCount < maxRetries) {
                retryCount++;
                setTimeout(initializeAutocomplete, 500);
            }
            return;
        }

        if (!mapRefForAutocomplete.current || !autocompleteInputRef.current) {
            console.log("Waiting for DOM elements...", {
                mapRef: !!mapRefForAutocomplete.current,
                inputRef: !!autocompleteInputRef.current
            });
            if (retryCount < maxRetries) {
                retryCount++;
                setTimeout(initializeAutocomplete, 300);
            }
            return;
        }

        try {
            const input = autocompleteInputRef.current;
            
            // Verify input element exists
            if (!input || typeof input.focus !== 'function') {
                console.error("Input element is not valid");
                return;
            }

            // Create map centered on India
            mapInstance = new window.google.maps.Map(mapRefForAutocomplete.current, {
                center: {
                    lat: 20.593684,
                    lng: 78.96288
                },
                zoom: 5
            });

            // Create Autocomplete instance
            autocompleteInstance = new window.google.maps.places.Autocomplete(input, {
                types: ['geocode', 'establishment'],
                fields: ['formatted_address', 'geometry', 'place_id', 'name', 'address_components'],
                componentRestrictions: undefined, // Allow all countries
            });

            autocompleteInstance.bindTo('bounds', mapInstance);

            // Create marker
            markerInstance = new window.google.maps.Marker({
                map: mapInstance,
                anchorPoint: new window.google.maps.Point(0, -29)
            });

            autocompleteRef.current = autocompleteInstance;
            markerRefForAutocomplete.current = markerInstance;

            // Handle place selection
            autocompleteInstance.addListener('place_changed', function () {
                if (!isMounted) return;

                markerInstance.setVisible(false);

                const place = autocompleteInstance.getPlace();

                if (!place.geometry) {
                    window.alert("No details available for input: '" + (place.name || '') + "'");
                    return;
                }

                // Update map view
                if (place.geometry.viewport) {
                    mapInstance.fitBounds(place.geometry.viewport);
                } else {
                    mapInstance.setCenter(place.geometry.location);
                    mapInstance.setZoom(17);
                }

                // Update marker position
                markerInstance.setPosition(place.geometry.location);
                markerInstance.setVisible(true);

                // Extract location data
                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();
                const placeId = place.place_id;

                // Extract address components
                let address = '';
                if (place.address_components) {
                    address = [
                        (place.address_components[0] && place.address_components[0].short_name || ''),
                        (place.address_components[1] && place.address_components[1].short_name || ''),
                        (place.address_components[2] && place.address_components[2].short_name || '')
                    ].join(' ');
                }

                const formattedAddress = place.formatted_address || address;
                updateFormValues(formattedAddress, placeId, lat, lng);
            });

            console.log("Google Places Autocomplete initialized successfully", {
                input: input,
                autocomplete: autocompleteInstance
            });
        } catch (error) {
            console.error("Error initializing Google Places Autocomplete:", error);
        }
    };

    // Load Google Maps API script
    const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_OLD_MAP_MAPS_API_KEY;

    if (window.google && window.google.maps && window.google.maps.places) {
        setTimeout(() => {
            if (isMounted) {
                initializeAutocomplete();
            }
        }, 300);
    } else {
        const existingScript = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]');

        if (existingScript) {
            existingScript.addEventListener('load', () => {
                setTimeout(() => {
                    if (isMounted) {
                        initializeAutocomplete();
                    }
                }, 300);
            });
        } else {
            const callbackName = `initMap_${Date.now()}`;

            window[callbackName] = () => {
                setTimeout(() => {
                    if (isMounted) {
                        initializeAutocomplete();
                    }
                    delete window[callbackName];
                }, 300);
            };

            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=${callbackName}`;
            script.async = true;
            script.defer = true;

            script.onerror = () => {
                console.error('Failed to load Google Maps API');
                delete window[callbackName];
            };

            document.head.appendChild(script);
        }
    }

    return () => {
        isMounted = false;

        if (autocompleteInstance) {
            try {
                window.google?.maps?.event?.clearInstanceListeners?.(autocompleteInstance);
            } catch (e) {
                console.error("Error cleaning up autocomplete:", e);
            }
            autocompleteInstance = null;
        }

        if (markerInstance) {
            try {
                markerInstance.setMap(null);
            } catch (e) {
                console.error("Error cleaning up marker:", e);
            }
            markerInstance = null;
        }

        autocompleteRef.current = null;
        markerRefForAutocomplete.current = null;
    };
}, [updateFormValues]);
```

---

### Step 6: Update Location Input Field

**Replace the react-select location field** with this native input:

**Before (react-select):**
```javascript
<Controller
    name="location"
    control={control}
    rules={{ required: "Please select a location" }}
    render={({ field }) => (
        <Select
            {...field}
            isClearable
            options={locationOptions}
            placeholder="Search location..."
            onInputChange={(value, { action }) => {
                if (action === "input-change") {
                    setLocation(value);
                }
                if (action === "input-blur" || action === "menu-close") {
                    setLocation("");
                }
            }}
            onChange={(selectedOption) => {
                field.onChange(selectedOption ? selectedOption.value : null);
            }}
            value={locationOptions.find(
                (option) => option.value === field.value
            ) || null}
        />
    )}
/>
```

**After (native input with Google Autocomplete):**
```javascript
<div className="relative">
    <label className="block text-sm font-medium text-gray-700 mb-2">
        Location*
    </label>
    <input
        type="text"
        id="location"
        name="location"
        ref={autocompleteInputRef}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="Enter a location (start typing to see suggestions)"
        autoComplete="off"
        defaultValue={selectedPlaceAddress}
        onChange={(e) => {
            const value = e.target.value;
            setSelectedPlaceAddress(value);
            setValue('location', value, { shouldValidate: false });
        }}
        onBlur={(e) => {
            const value = e.target.value || selectedPlaceAddress || '';
            setValue('location', value, { shouldValidate: true });
        }}
        required
    />
    {errors.location && (
        <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
    )}
    {/* Hidden fields for latitude, longitude, and place_id */}
    <input type="hidden" name="latitude" value={selectedPlaceLat} />
    <input type="hidden" name="longitude" value={selectedPlaceLng} />
    <input type="hidden" name="place_id" value={selectedPlaceId} />
    {/* Ensure Google Autocomplete dropdown is visible */}
    <style>{`
        .pac-container {
            z-index: 9999 !important;
            border-radius: 8px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
        .pac-item {
            padding: 8px;
            cursor: pointer;
        }
        .pac-item:hover {
            background-color: #f0f0f0;
        }
    `}</style>
</div>
```

---

### Step 7: Add Map Container

**Add this map container** below the location input field (inside the Location Information section):

```javascript
{/* Map Container */}
<div className="mt-4">
    <div id="map" ref={mapRefForAutocomplete} style={{ height: '300px', width: '100%', borderRadius: '8px' }}></div>
</div>
```

---

### Step 8: Update Form Submission

**Update the form submission** to use the new location state variables:

**Before:**
```javascript
formData.append("location", data.location);
formData.append("address", data4.address || "");
formData.append("googleSearchLocation", data.location);
formData.append("googleSearchLat", data4.location?.lat || "");
formData.append("googleSearchLong", data4.location?.lng || "");
```

**After:**
```javascript
formData.append("location", selectedPlaceId || "");
formData.append("address", selectedPlaceAddress || "");
formData.append("googleSearchLocation", selectedPlaceAddress || "");
formData.append("googleSearchLat", selectedPlaceLat || "");
formData.append("googleSearchLong", selectedPlaceLng || "");
```

---

## Environment Variable

**Ensure this is set in your `.env` file:**
```env
VITE_OLD_MAP_MAPS_API_KEY=your_google_maps_api_key_here
```

---

## Testing Checklist

### For Add Components:
- [ ] Google Maps API loads without errors (check browser console)
- [ ] Typing in location field shows autocomplete suggestions
- [ ] Selecting a location updates the map with a marker
- [ ] Map centers and zooms to selected location
- [ ] Form submission includes correct location data
- [ ] Hidden fields (latitude, longitude, place_id) are populated
- [ ] No console errors related to Google Maps

### For Edit Components (Additional):
- [ ] Existing location address is displayed in the input field
- [ ] Map loads and centers on existing location when component mounts
- [ ] Marker is visible at existing location
- [ ] Place ID lookup works correctly (if Place ID exists)
- [ ] Fallback to coordinates works if Place ID lookup fails
- [ ] Updating location works correctly
- [ ] Form submission preserves location if not changed
- [ ] Location data is correctly pre-filled from entity prop

---

## Common Issues & Solutions

### Issue: Autocomplete suggestions not showing

**Solution:**
1. Check browser console for Google Maps API errors
2. Verify `VITE_OLD_MAP_MAPS_API_KEY` is set correctly
3. Check network tab to ensure Google Maps script loads
4. Verify the input ref is properly set: `autocompleteInputRef.current` should not be null

### Issue: Map not displaying

**Solution:**
1. Ensure `mapRefForAutocomplete` ref is attached to a div element
2. Check that the div has explicit height (e.g., `height: '300px'`)
3. Verify Google Maps API loaded successfully

### Issue: Location data not saving

**Solution:**
1. Check that `selectedPlaceAddress`, `selectedPlaceLat`, `selectedPlaceLng`, `selectedPlaceId` are being set
2. Verify form submission uses the new state variables
3. Check browser console for any errors during form submission

### Issue: Map not loading existing location in edit mode

**Solution:**
1. Verify `mapInstanceRef.current` is set after map initialization
2. Check that the Place ID lookup useEffect has correct dependencies
3. Ensure the timeout (800ms) is sufficient for map to be ready
4. Check browser console for Places Service errors
5. Verify `entity.googleSearchLocation` contains a valid Place ID (starts with 'ChI')
6. Check fallback logic - coordinates should be used if Place ID lookup fails

### Issue: Location input not showing existing address

**Solution:**
1. Verify `selectedPlaceAddress` is set in the pre-fill useEffect
2. Check that `defaultValue` prop uses the correct fallback order: `selectedPlaceAddress || entity.address || entity.googleSearchLocation`
3. Ensure the pre-fill useEffect runs after entity prop is available

---

---

## Additional Steps for Edit Components

If you're migrating an **edit component** (e.g., `AdminEditOrganizer.jsx`), follow these additional steps:

### Step 9: Add Map Instance Ref

**Add this ref** to store the map instance for later updates:

```javascript
const mapInstanceRef = React.useRef(null);
```

**Update the map initialization** to store the instance:

```javascript
autocompleteRef.current = autocompleteInstance;
markerRefForAutocomplete.current = markerInstance;
mapInstanceRef.current = mapInstance; // Add this line
```

**Update cleanup** to clear the ref:

```javascript
autocompleteRef.current = null;
markerRefForAutocomplete.current = null;
mapInstanceRef.current = null; // Add this line
```

---

### Step 10: Pre-fill Location Data from Existing Entity

**Add this useEffect** to pre-fill location data when the entity (e.g., organizer) is loaded:

```javascript
// Pre-fill form data when entity changes
useEffect(() => {
    if (!entity) { // Replace 'entity' with your prop name (e.g., 'organizer')
        setFormLoading(false);
        return;
    }

    // Reset form with entity data
    reset({
        // ... other form fields ...
        location: entity.googleSearchLocation || '',
    });

    // Pre-fill Google Places location data
    // Use address (human-readable) for display, googleSearchLocation (place ID) for place_id
    if (entity.address && entity.address !== 'not specified') {
        setSelectedPlaceAddress(entity.address);
    } else if (entity.googleSearchLocation) {
        // If no address, use googleSearchLocation (might be place ID or address)
        setSelectedPlaceAddress(entity.googleSearchLocation);
    }
    
    if (entity.googleSearchLocation) {
        setSelectedPlaceId(entity.googleSearchLocation);
    }
    
    // Handle lat/lng - they might not exist in the response
    if (entity.googleSearchLat) {
        setSelectedPlaceLat(entity.googleSearchLat.toString());
    }
    if (entity.googleSearchLong) {
        setSelectedPlaceLng(entity.googleSearchLong.toString());
    }

    // ... rest of your pre-fill logic ...
}, [entity?._id, reset, setValue]); // Only depend on entity ID, not the whole object
```

---

### Step 11: Load Map with Existing Place ID

**Add this useEffect** to load the map with the existing location when editing:

```javascript
// Update map with existing entity location after map is initialized
useEffect(() => {
    if (!entity || !mapInstanceRef.current || !markerRefForAutocomplete.current) {
        return;
    }

    // Wait a bit for map to be ready
    const updateMapLocation = setTimeout(() => {
        if (!window.google || !window.google.maps || !window.google.maps.places) {
            return;
        }

        const mapInstance = mapInstanceRef.current;
        const marker = markerRefForAutocomplete.current;

        if (!mapInstance || !marker) {
            return;
        }

        // If we have a Place ID, use Places Service to get details
        if (entity.googleSearchLocation && entity.googleSearchLocation.startsWith('ChI')) {
            const placesService = new window.google.maps.places.PlacesService(mapInstance);
            const placeId = entity.googleSearchLocation;

            placesService.getDetails(
                {
                    placeId: placeId,
                    fields: ['formatted_address', 'geometry', 'place_id', 'name', 'address_components']
                },
                (place, status) => {
                    if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
                        // Center map on place location
                        if (place.geometry && place.geometry.location) {
                            const lat = place.geometry.location.lat();
                            const lng = place.geometry.location.lng();

                            mapInstance.setCenter({ lat, lng });
                            mapInstance.setZoom(15);

                            // Show marker at place location
                            marker.setPosition({ lat, lng });
                            marker.setVisible(true);

                            // Update form values with place details
                            const formattedAddress = place.formatted_address || entity.address || '';
                            updateFormValues(formattedAddress, place.place_id, lat, lng);

                            // Update input field value
                            if (autocompleteInputRef.current) {
                                autocompleteInputRef.current.value = formattedAddress;
                            }
                        }
                    } else {
                        // Fallback to coordinates if Place ID lookup fails
                        if (entity.googleSearchLat && entity.googleSearchLong) {
                            const lat = parseFloat(entity.googleSearchLat);
                            const lng = parseFloat(entity.googleSearchLong);

                            if (!isNaN(lat) && !isNaN(lng)) {
                                mapInstance.setCenter({ lat, lng });
                                mapInstance.setZoom(15);
                                marker.setPosition({ lat, lng });
                                marker.setVisible(true);
                            }
                        } else if (entity.location && entity.location.coordinates) {
                            // Use location coordinates as last resort
                            const [lng, lat] = entity.location.coordinates;
                            if (!isNaN(lat) && !isNaN(lng)) {
                                mapInstance.setCenter({ lat, lng });
                                mapInstance.setZoom(15);
                                marker.setPosition({ lat, lng });
                                marker.setVisible(true);
                            }
                        }
                    }
                }
            );
        } else if (entity.googleSearchLat && entity.googleSearchLong) {
            // Fallback: Use coordinates directly
            const lat = parseFloat(entity.googleSearchLat);
            const lng = parseFloat(entity.googleSearchLong);

            if (!isNaN(lat) && !isNaN(lng)) {
                mapInstance.setCenter({ lat, lng });
                mapInstance.setZoom(15);
                marker.setPosition({ lat, lng });
                marker.setVisible(true);
            }
        } else if (entity.location && entity.location.coordinates) {
            // Last resort: Use location coordinates
            const [lng, lat] = entity.location.coordinates;
            if (!isNaN(lat) && !isNaN(lng)) {
                mapInstance.setCenter({ lat, lng });
                mapInstance.setZoom(15);
                marker.setPosition({ lat, lng });
                marker.setVisible(true);
            }
        }
    }, 800); // Increased timeout to ensure map is fully ready

    return () => clearTimeout(updateMapLocation);
}, [entity?._id, entity?.googleSearchLocation, entity?.googleSearchLat, entity?.googleSearchLong, entity?.location, updateFormValues]);
```

**Note:** Replace `entity` with your actual prop name (e.g., `organizer`, `venue`, `performer`).

---

### Step 12: Update Location Input Default Value

**Update the location input** to show existing address:

```javascript
<input
    type="text"
    id="location"
    name="location"
    ref={autocompleteInputRef}
    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
    placeholder="Enter a location (start typing to see suggestions)"
    autoComplete="off"
    defaultValue={selectedPlaceAddress || entity.address || entity.googleSearchLocation || ''}
    onChange={(e) => {
        const value = e.target.value;
        setSelectedPlaceAddress(value);
        setValue('location', value, { shouldValidate: false });
    }}
    onBlur={(e) => {
        const value = e.target.value || selectedPlaceAddress || '';
        setValue('location', value, { shouldValidate: true });
    }}
    required
/>
```

---

### Step 13: Update Form Submission for Edit

**Update form submission** to handle both new and existing location data:

```javascript
// Construct GeoJSON Point for location field (MongoDB expects this format)
const lat = selectedPlaceLat || entity.googleSearchLat;
const lng = selectedPlaceLng || entity.googleSearchLong;
if (lat && lng) {
    const locationGeoJSON = {
        type: "Point",
        coordinates: [parseFloat(lng), parseFloat(lat)] // GeoJSON: [longitude, latitude]
    };
    formData.append("location", JSON.stringify(locationGeoJSON));
}

formData.append("name", data.listingTitle);
formData.append("description", data.listingDescription);
formData.append("address", selectedPlaceAddress || entity.address || "");
formData.append("googleSearchLocation", selectedPlaceId || entity.googleSearchLocation || "");
formData.append("googleSearchLat", lat || "");
formData.append("googleSearchLong", lng || "");
```

---

## Files to Update

Apply these changes to:
- ✅ `AdminAddOrganizer.jsx` (Already done)
- ✅ `AdminEditOrganizer.jsx` (Already done)
- ⬜ `AdminAddVenue.jsx`
- ⬜ `AdminEditVenue.jsx`
- ⬜ `AdminAddPerformer.jsx`
- ⬜ `AdminEditPerformer.jsx`
- ⬜ Any other components using location search

---

## Reference Files

- **Working Example:** `src/Components/CreatePage/CreatePage.jsx`
- **Migrated Add Example:** `src/Components/AdminPanel/AdminAddOrganizer.jsx`
- **Migrated Edit Example:** `src/Components/AdminPanel/AdminEditOrganizer.jsx`

---

## Notes

- The Google Maps API key is loaded from environment variables
- The autocomplete dropdown uses `.pac-container` class (Google's default)
- Map is centered on India by default (can be changed in initialization)
- The implementation includes retry logic for API loading
- Cleanup is handled in the useEffect return function

---

**Last Updated:** [Current Date]  
**Author:** Migration Guide  
**Version:** 1.0


