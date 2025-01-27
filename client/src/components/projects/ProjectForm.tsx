import React, { useState } from "react";

const CreateProjectForm: React.FC = () => {
  // State for form fields
  const [projectName, setProjectName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [status, setStatus] = useState<string>("Not Started");
  const [owner, setOwner] = useState<string>("");
  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  const [priority, setPriority] = useState<string>("Medium");
  const [tags, setTags] = useState<string[]>([]);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [budget, setBudget] = useState<number | null>(null);
  const [color, setColor] = useState<string>("#FF5733");

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!projectName || !startDate || !endDate || !owner) {
      alert("Please fill in all required fields.");
      return;
    }

    // Create project object
    const project = {
      projectName,
      description,
      startDate,
      endDate,
      status,
      owner,
      teamMembers,
      priority,
      tags,
      attachments,
      budget,
      color,
    };

    console.log("Project Created:", project);
    alert("Project created successfully!");
  };

  // Handle adding/removing team members
  const handleAddTeamMember = (member: string) => {
    if (member && !teamMembers.includes(member)) {
      setTeamMembers([...teamMembers, member]);
    }
  };

  const handleRemoveTeamMember = (member: string) => {
    setTeamMembers(teamMembers.filter((m) => m !== member));
  };

  // Handle adding/removing tags
  const handleAddTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  // Handle file uploads
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setAttachments(files);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-4 text-black gap-6 p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold text-center col-span-full">Create a New Project</h2>

      {/* Project Name */}
      <div className="col-span-full">
        <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">
          Project Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="projectName"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Description */}
      <div className="col-span-full">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
      </div>

      {/* Start Date */}
      <div>
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
          Start Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* End Date */}
      <div>
        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
          End Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Status */}
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Owner */}
      <div>
        <label htmlFor="owner" className="block text-sm font-medium text-gray-700">
          Owner <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="owner"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Team Members */}
      <div className="col-span-full">
        <label htmlFor="teamMembers" className="block text-sm font-medium text-gray-700">
          Team Members
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            id="teamMembers"
            placeholder="Add a team member"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddTeamMember(e.currentTarget.value);
                e.currentTarget.value = "";
              }
            }}
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {teamMembers.map((member) => (
            <span
              key={member}
              className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {member}
              <button
                type="button"
                onClick={() => handleRemoveTeamMember(member)}
                className="ml-2 text-blue-800 hover:text-blue-900"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Priority */}
      <div>
        <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
          Priority
        </label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {/* Tags */}
      <div className="col-span-full">
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
          Tags
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            id="tags"
            placeholder="Add a tag"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddTag(e.currentTarget.value);
                e.currentTarget.value = "";
              }
            }}
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="ml-2 text-green-800 hover:text-green-900"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Attachments */}
      <div className="col-span-full">
        <label htmlFor="attachments" className="block text-sm font-medium text-gray-700">
          Attachments
        </label>
        <input
          type="file"
          id="attachments"
          multiple
          onChange={handleFileUpload}
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Budget */}
      <div>
        <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
          Budget
        </label>
        <input
          type="number"
          id="budget"
          value={budget || ""}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Color */}
      <div>
        <label htmlFor="color" className="block text-sm font-medium text-gray-700">
          Color
        </label>
        <input
          type="color"
          id="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit Button */}
      <div className="col-span-full">
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Project
        </button>
      </div>
    </form>
  );
};

export default CreateProjectForm;