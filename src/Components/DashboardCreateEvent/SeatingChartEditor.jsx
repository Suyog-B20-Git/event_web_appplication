import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Circle, Text, Group } from 'react-konva';

const SeatingChartEditor = ({ onSave, initialData }) => {
    const [elements, setElements] = useState(initialData?.objects || []);
    const [selectedId, setSelectedId] = useState(null);
    const stageRef = useRef(null);

    // Basic Tools
    const addSection = () => {
        const newSection = {
            id: `section-${Date.now()}`,
            type: 'section',
            x: 50,
            y: 50,
            width: 150,
            height: 100,
            fill: '#e0e0e0',
            label: 'New Section',
            capacity: 50,
            price: 0
        };
        setElements([...elements, newSection]);
    };

    const addTable = () => {
        const newTable = {
            id: `table-${Date.now()}`,
            type: 'table',
            x: 100,
            y: 100,
            radius: 30,
            fill: '#ffffff',
            stroke: '#000000',
            seats: 4,
            label: 'T-1'
        };
        setElements([...elements, newTable]);
    };

    const handleDragEnd = (e, id) => {
        const updatedElements = elements.map((el) => {
            if (el.id === id) {
                return {
                    ...el,
                    x: e.target.x(),
                    y: e.target.y()
                };
            }
            return el;
        });
        setElements(updatedElements);
    };

    const handleSave = () => {
        if (stageRef.current) {
            const layoutData = {
                objects: elements,
                width: stageRef.current.width(),
                height: stageRef.current.height()
            };
            onSave(layoutData);
        }
    };

    const updateElement = (id, key, value) => {
        setElements(elements.map(el => el.id === id ? { ...el, [key]: value } : el));
    };

    const deleteElement = (id) => {
        setElements(elements.filter(e => e.id !== id));
        setSelectedId(null);
    };

    return (
        <div className="flex flex-col h-full bg-gray-100 rounded-lg overflow-hidden border border-gray-300">
            {/* Toolbar */}
            <div className="bg-white p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={addSection}
                        className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm font-medium"
                    >
                        + Section
                    </button>
                    <button
                        type="button"
                        onClick={addTable}
                        className="px-3 py-1.5 bg-green-100 text-green-700 rounded hover:bg-green-200 text-sm font-medium"
                    >
                        + Table
                    </button>
                </div>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => setElements([])}
                        className="px-3 py-1.5 text-red-600 hover:bg-red-50 rounded text-sm hover:underline"
                    >
                        Clear All
                    </button>
                </div>
            </div>

            {/* Canvas Area */}
            <div className="flex-1 overflow-auto bg-gray-50 relative min-h-[400px] flex justify-center items-center">
                <Stage
                    width={800}
                    height={600}
                    ref={stageRef}
                    className="bg-white shadow-lg"
                    onMouseDown={(e) => {
                        // Deselect if clicked on empty stage
                        const clickedOnEmpty = e.target === e.target.getStage();
                        if (clickedOnEmpty) {
                            setSelectedId(null);
                        }
                    }}
                >
                    <Layer>
                        {elements.map((el) => {
                            const isSelected = selectedId === el.id;
                            if (el.type === 'section') {
                                return (
                                    <Group
                                        key={el.id}
                                        id={el.id}
                                        draggable
                                        x={el.x}
                                        y={el.y}
                                        onDragEnd={(e) => handleDragEnd(e, el.id)}
                                        onClick={() => setSelectedId(el.id)}
                                        onTap={() => setSelectedId(el.id)}
                                    >
                                        <Rect
                                            width={el.width}
                                            height={el.height}
                                            fill={el.fill}
                                            stroke={isSelected ? '#3b82f6' : '#9ca3af'}
                                            strokeWidth={isSelected ? 2 : 1}
                                            cornerRadius={4}
                                            shadowBlur={isSelected ? 10 : 0}
                                        />
                                        <Text
                                            text={el.label}
                                            width={el.width}
                                            align="center"
                                            y={el.height / 2 - 10}
                                            fontSize={14}
                                            fontStyle="bold"
                                            fill="#374151"
                                        />
                                        <Text
                                            text={`Cap: ${el.capacity}`}
                                            width={el.width}
                                            align="center"
                                            y={el.height / 2 + 10}
                                            fontSize={12}
                                            fill="#6b7280"
                                        />
                                    </Group>
                                );
                            } else if (el.type === 'table') {
                                return (
                                    <Group
                                        key={el.id}
                                        id={el.id}
                                        draggable
                                        x={el.x}
                                        y={el.y}
                                        onDragEnd={(e) => handleDragEnd(e, el.id)}
                                        onClick={() => setSelectedId(el.id)}
                                        onTap={() => setSelectedId(el.id)}
                                    >
                                        <Circle
                                            radius={el.radius}
                                            fill={el.fill}
                                            stroke={isSelected ? '#3b82f6' : '#000000'}
                                            strokeWidth={isSelected ? 3 : 1}
                                            shadowBlur={isSelected ? 10 : 0}
                                        />
                                        <Text
                                            text={el.label}
                                            x={-el.radius}
                                            y={-7}
                                            width={el.radius * 2}
                                            align="center"
                                            fontSize={12}
                                            fontStyle="bold"
                                        />
                                        {/* Render seats around table */}
                                        {Array.from({ length: el.seats || 4 }).map((_, i) => {
                                            const angle = (i * 360) / (el.seats || 4);
                                            const seatRad = 8;
                                            const dist = el.radius + 12;
                                            const sx = dist * Math.cos((angle * Math.PI) / 180);
                                            const sy = dist * Math.sin((angle * Math.PI) / 180);
                                            return (
                                                <Circle
                                                    key={i}
                                                    x={sx}
                                                    y={sy}
                                                    radius={seatRad}
                                                    fill="#cbd5e1"
                                                    stroke="#64748b"
                                                    strokeWidth={1}
                                                />
                                            );
                                        })}
                                    </Group>
                                );
                            }
                            return null;
                        })}
                    </Layer>
                </Stage>
            </div>

            {/* Properties Panel */}
            {selectedId && (
                <div className="bg-white p-4 border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-10">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-semibold text-gray-700">Properties</h3>
                        <button
                            type="button"
                            onClick={() => deleteElement(selectedId)}
                            className="text-red-500 text-xs hover:text-red-700 font-medium"
                        >
                            Delete
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Label</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:border-blue-500 outline-none"
                                value={elements.find(e => e.id === selectedId)?.label || ''}
                                onChange={(e) => updateElement(selectedId, 'label', e.target.value)}
                            />
                        </div>

                        {elements.find(e => e.id === selectedId)?.type === 'section' && (
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Capacity</label>
                                <input
                                    type="number"
                                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:border-blue-500 outline-none"
                                    value={elements.find(e => e.id === selectedId)?.capacity || 0}
                                    onChange={(e) => updateElement(selectedId, 'capacity', parseInt(e.target.value) || 0)}
                                />
                            </div>
                        )}

                        {elements.find(e => e.id === selectedId)?.type === 'table' && (
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Seats</label>
                                <input
                                    type="number"
                                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:border-blue-500 outline-none"
                                    value={elements.find(e => e.id === selectedId)?.seats || 0}
                                    onChange={(e) => updateElement(selectedId, 'seats', parseInt(e.target.value) || 0)}
                                    min="1"
                                    max="20"
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="p-4 bg-gray-50 border-t border-gray-200">
                <button
                    type="button"
                    onClick={handleSave}
                    className="w-full py-2 bg-pink-600 text-white rounded hover:bg-pink-700 font-medium transition-colors"
                >
                    Save Seating Layout
                </button>
            </div>
        </div>
    );
};

export default SeatingChartEditor;
