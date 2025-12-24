import React from 'react';
import { Link } from 'react-router-dom';
import { getAllWeeklies } from '../lib/content';
import { format } from 'date-fns';

export default function Weekly() {
  const weeklies = getAllWeeklies();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Weekly Insights</h1>
        <p className="text-xl text-gray-600">
          Personal reflections on philosophy, tech, and life.
        </p>
      </div>

      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
        {weeklies.map((weekly) => (
          <div key={weekly.slug} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            
            {/* Icon */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-primary text-slate-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold">
              {weekly.issueNumber}
            </div>
            
            {/* Card */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border border-slate-200 shadow hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between space-x-2 mb-1">
                <div className="font-bold text-slate-900">
                  <Link to={`/weekly/${weekly.slug}`} className="hover:text-primary">
                    {weekly.title}
                  </Link>
                </div>
                <time className="font-caveat font-medium text-indigo-500 text-sm">
                  {format(new Date(weekly.date), 'MMM d, yyyy')}
                </time>
              </div>
              <div className="text-slate-500 text-sm">
                {weekly.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
