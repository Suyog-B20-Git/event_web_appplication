import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FaArrowLeft, FaSave, FaGripVertical } from 'react-icons/fa';
import { FiInfo } from 'react-icons/fi';


function SortablePageItem({ id, page, index }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || 'transform 250ms ease-in-out, box-shadow 250ms ease-in-out',
  };

  const itemClasses = `
    flex items-center bg-white p-3 rounded-xl border mb-3 transition-all duration-200 cursor-grab active:cursor-grabbing
    ${isDragging 
      ? 'shadow-2xl scale-[1.02] bg-blue-50 z-10 relative border-blue-300' 
      : 'shadow-md hover:shadow-lg border-gray-200'
    }
  `;

  return (
    
    <div 
      ref={setNodeRef} 
      style={style} 
      className={itemClasses}
      {...attributes}
      {...listeners}
    >
     
      <span className="p-2 text-gray-400" aria-hidden="true">
        <FaGripVertical size={20} />
      </span>
      
      <span className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 text-gray-600 font-bold text-sm mx-3">
        {index + 1}
      </span>
      
      <span className="text-gray-800 font-medium">{page.title}</span>
    </div>
  );
}


const OrderPages = ({ pages, setPages, onBack }) => {
  const [orderedPages, setOrderedPages] = useState([...pages].sort((a, b) => a.order - b.order));

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setOrderedPages((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };
  
  const handleSaveOrder = () => {
    const updatedPagesWithOrder = orderedPages.map((page, index) => ({
      ...page,
      order: index,
    }));
    setPages(updatedPagesWithOrder);
    alert('Page order saved successfully!');
    onBack();
  };

  return (
   
    <div>
      
      <div className="flex justify-between items-center bg-transparent p-0 rounded-lg mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Set Page Order</h1>
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="flex items-center bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 text-sm rounded-lg shadow-sm transition-all duration-200"
          >
            <FaArrowLeft className="mr-2" /> Back to List
          </button>
          <button
            onClick={handleSaveOrder}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            <FaSave className="mr-2" /> Save Order
          </button>
        </div>
      </div>

 
      <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
        <p className="flex items-center text-sm text-gray-500 mb-6 p-3 bg-gray-50 rounded-lg border">
            <FiInfo className="mr-3 text-gray-400 flex-shrink-0" size={18} />
            Click and drag anywhere on a page item to set its display order.
        </p>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={orderedPages.map(p => p.id)}
            strategy={verticalListSortingStrategy}
          >
            {orderedPages.map((page, index) => (
              <SortablePageItem key={page.id} id={page.id} page={page} index={index} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default OrderPages;