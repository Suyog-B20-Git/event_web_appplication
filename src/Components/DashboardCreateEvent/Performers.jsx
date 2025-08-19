import React, { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPerformers } from "../../redux/actions/master/Events/GetPerformer";
import { getPerformerById } from "../../redux/actions/master/Performers/getPerformerById";
import Select from "react-select";

const Performers = ({ data, setData, nextTab }) => {
    const dispatch = useDispatch();

    const [performer, setPerformer] = useState("");
    const [selectedPerformers, setSelectedPerformers] = useState([]);
    const [performersYtLinks, setPerformersYtLinks] = useState(data.performersYtLinks || [""]);
    const [performerError, setPerformerError] = useState("");
    const [ytLinksError, setYtLinksError] = useState("");
    const [userHasSelectedPerformers, setUserHasSelectedPerformers] = useState(false);

    // Get performer data from Redux store - moved before useEffect to avoid hoisting issues
    const store1 = useSelector((state) => state.performersReducer) || {
        performers: [],
    };
    const performersData = store1?.performers || []; // Ensure data is always an array

    // Create performer options from API data - memoized to prevent infinite re-renders
    const performerOptions = useMemo(() => {
        return performersData.map((performer) => ({
            value: performer._id,
            label: performer.name,
        }));
    }, [performersData]);

    // Initialize and sync local state with centralized state
    useEffect(() => {
        // Always sync performersYtLinks with centralized state
        if (data.performersYtLinks) {
            setPerformersYtLinks(data.performersYtLinks);
        }

        // Only sync performers selection if user hasn't manually selected them
        if (!userHasSelectedPerformers) {
            // Handle performers initialization and updates
            if (data.performers && data.performers.length > 0) {
                // Use stored performer data if available (preferred)
                if (data.performersData && data.performersData.length > 0) {
                    const performerOptions = data.performersData.map(performer => ({
                        value: performer._id,
                        label: performer.name
                    }));
                    setSelectedPerformers(performerOptions);
                } else {
                    // Create basic options with IDs as fallback
                    const performerOptions = data.performers.map(id => ({
                        value: id,
                        label: `Performer ${id.slice(-4)}`
                    }));
                    setSelectedPerformers(performerOptions);
                }
            } else {
                setSelectedPerformers([]);
            }
        }
    }, [data.performers, data.performersData, data.performersYtLinks, userHasSelectedPerformers]);

    // Fetch API data whenever `performer` updates
    useEffect(() => {
        if (performer) {
            dispatch(getPerformers(performer.toLowerCase()));
        }
    }, [dispatch, performer]);

    // Reset user selection flag when data changes (new event loaded)
    useEffect(() => {
        setUserHasSelectedPerformers(false);
    }, [data.performersData]); // Reset when performersData changes (new event loaded)

    const handleAddPerformerLink = () => {
        setPerformersYtLinks([...performersYtLinks, ""]);
    };

    const handleRemovePerformerLink = (index) => {
        const updatedLinks = performersYtLinks.filter((_, i) => i !== index);
        setPerformersYtLinks(updatedLinks);
        setData(prev => ({ ...prev, performersYtLinks: updatedLinks }));
    };

    const handlePerformerLinkChange = (index, value) => {
        const updatedLinks = [...performersYtLinks];
        updatedLinks[index] = value;
        setPerformersYtLinks(updatedLinks);
        setData(prev => ({ ...prev, performersYtLinks: updatedLinks }));
    };

    const validatePerformers = () => {
        const hasPerformers = data.performers && data.performers.length > 0;
        const hasYtLinks = performersYtLinks && performersYtLinks.some((link) => link?.trim() !== "");

        // Clear previous errors
        setPerformerError("");
        setYtLinksError("");

        // Check if at least one is provided
        if (!hasPerformers && !hasYtLinks) {
            setPerformerError("Either Performers or Performers YouTube Link is required.");
            setYtLinksError("Either Performers or Performers YouTube Link is required.");
            return false;
        }

        return true;
    };

    const handleSave = () => {
        if (!validatePerformers()) {
            return; // Don't proceed if validation fails
        }

        console.log("Saved Performers:", { performers: data.performers, performersYtLinks: data.performersYtLinks });
        nextTab(); // move to next tab after saving
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performers</h3>

                <div className="flex items-start justify-center h-full mb-4">
                    {/* Performers Select */}
                    <div className="w-1/2 flex flex-col gap-2">
                        <label
                            htmlFor="performers"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Performers
                        </label>

                        <Select
                            isMulti
                            options={performerOptions}
                            placeholder="Select performers..."
                            getOptionLabel={(option) => option.label}
                            getOptionValue={(option) => option.value}
                            onInputChange={(value) => setPerformer(value)}
                            onChange={(selectedOptions) => {
                                setSelectedPerformers(selectedOptions);
                                const selectedIDs = selectedOptions
                                    ? selectedOptions.map((option) => option.value)
                                    : [];
                                setData(prev => ({ ...prev, performers: selectedIDs }));

                                // Mark that user has made a selection
                                setUserHasSelectedPerformers(true);

                                // Clear errors when performers are selected
                                if (selectedIDs.length > 0) {
                                    setPerformerError("");
                                    setYtLinksError("");
                                }
                            }}
                            value={selectedPerformers}
                            isClearable
                            noOptionsMessage={() => "Type... to see performers"}
                            isDisabled={performersYtLinks.some(
                                (link) => link?.trim() !== ""
                            )}
                            classNamePrefix="react-select"
                            className={`react-select-container ${performersYtLinks.some((link) => link?.trim() !== "")
                                ? "bg-gray-200 cursor-not-allowed"
                                : ""
                                }`}
                        />
                        {performerError && (
                            <p className="text-red-500 text-sm min-h-[1rem]">
                                {performerError}
                            </p>
                        )}
                    </div>

                    {/* OR separator */}
                    <div className="px-4 flex items-start justify-center mt-8">
                        <span className="text-gray-500 font-semibold">or</span>
                    </div>

                    {/* Performer Youtube Link Field */}
                    <div className="w-1/2 flex flex-col gap-2">
                        <label
                            htmlFor="performersYtLinks"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Performers Youtube Link
                        </label>

                        {performersYtLinks.map((link, index) => (
                            <div key={index} className="flex gap-2 items-center">
                                <input
                                    type="url"
                                    className={`mt-1 block w-full border rounded-md p-2 min-h-[42px] ${data.performers?.length > 0
                                        ? "bg-gray-200 cursor-not-allowed"
                                        : ""
                                        }`}
                                    placeholder="Enter performers youtube link"
                                    value={link}
                                    onChange={(e) => {
                                        handlePerformerLinkChange(index, e.target.value);

                                        // Clear errors when map URL is entered
                                        if (e.target.value.trim() !== "") {
                                            setPerformerError("");
                                            setYtLinksError("");
                                        }
                                    }}
                                    disabled={data.performers?.length > 0}
                                />

                                {index > 0 && (
                                    <button
                                        type="button"
                                        className="text-red-600 font-bold px-2"
                                        onClick={() => handleRemovePerformerLink(index)}
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={handleAddPerformerLink}
                            className="mt-2 bg-red-500 text-white px-2 py-1 rounded-md w-fit text-sm"
                        >
                            + Add More
                        </button>
                        {ytLinksError && (
                            <p className="text-red-500 text-sm min-h-[1rem]">
                                {ytLinksError}
                            </p>
                        )}
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={handleSave}
                        className="bg-[#ff2459] text-white px-6 py-2 rounded-lg hover:bg-[#e0204f]"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Performers; 