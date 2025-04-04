import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

function TransportEntry() {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      departureTimes: [{ time: '' }],
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'departureTimes'
  });

  const onSubmit = (data) => {
    console.log("Transport Entry Submitted:", data);
    alert("Transport details submitted successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-xl w-full">
        <h2 className="text-2xl font-bold text-green-700 text-center mb-4">Transport Entry</h2>
        <p className="text-gray-600 text-center mb-6">Provide transport details to add a new entry.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Other input fields (unchanged) */}
          <div>
            <label className="block text-gray-700 font-medium">Agency Name*</label>
            <input
              type="text"
              {...register('agencyName', { required: 'Agency name is required' })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Enter agency name"
            />
            {errors.agencyName && <p className="text-red-500 text-sm">{errors.agencyName.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Transport Type*</label>
            <select
              {...register('transportType', { required: 'Transport type is required' })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Transport Type</option>
              <option value="Bus">Bus</option>
              <option value="Train">Train</option>
              <option value="Taxi">Taxi</option>
              <option value="Metro">Metro</option>
            </select>
            {errors.transportType && <p className="text-red-500 text-sm">{errors.transportType.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Starting Destination*</label>
            <input
              type="text"
              {...register('startingDestination', { required: 'Starting destination is required' })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Enter starting point"
            />
            {errors.startingDestination && <p className="text-red-500 text-sm">{errors.startingDestination.message}</p>}
          </div>

          {/* 👇 Multiple Departure Times (Array) 👇 */}
          <div>
            <label className="block text-gray-700 font-medium">Departure Times*</label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2 mb-2">
                <input
                  type="time"
                  {...register(`departureTimes.${index}.time`, { required: 'Time is required' })}
                  className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
                <button type="button" onClick={() => remove(index)} className="text-red-500 hover:text-red-700 font-bold text-xl">
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => append({ time: '' })}
              className="text-sm text-green-600 mt-1 hover:underline"
            >
              + Add More Time
            </button>
            {errors.departureTimes && <p className="text-red-500 text-sm">Please add at least one time.</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Frequency (per day)*</label>
            <input
              type="number"
              {...register('frequency', { required: 'Frequency is required', min: 1 })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Enter frequency (e.g. 5)"
            />
            {errors.frequency && <p className="text-red-500 text-sm">{errors.frequency.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Fare (₹)*</label>
            <input
              type="number"
              {...register('fare', { required: 'Fare is required', min: 1 })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Enter fare amount"
            />
            {errors.fare && <p className="text-red-500 text-sm">{errors.fare.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Contact Info*</label>
            <input
              type="text"
              {...register('contactInfo', { required: 'Contact info is required' })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Enter contact details"
            />
            {errors.contactInfo && <p className="text-red-500 text-sm">{errors.contactInfo.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200"
          >
            Submit Transport Entry
          </button>
        </form>
      </div>
    </div>
  );
}

export default TransportEntry;
