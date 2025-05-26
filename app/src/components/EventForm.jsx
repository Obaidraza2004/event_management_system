import { useState } from "react";
import { supabase } from "../supabase/client";

export default function EventForm({ user }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    event_time: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.image) {
      alert("Please select an image.");
      return;
    }

    // Upload image to Supabase Storage
    const filename = `${Date.now()}_${form.image.name}`;
    const filePath = `events/${filename}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("event-images")
      .upload(filePath, form.image);

    if (uploadError) {
      alert("Image upload failed: " + uploadError.message);
      return;
    }

    // Get public URL of the uploaded image
    const {
      data: { publicUrl },
    } = supabase.storage.from("event-images").getPublicUrl(filePath);

    // Insert event data into Supabase table
    const { error: insertError } = await supabase.from("events").insert([
      {
        user_id: user.id,
        title: form.title,
        description: form.description,
        location: form.location,
        date: form.event_time,
        image_url: publicUrl,
        status: "pending",
      },
    ]);

    if (insertError) {
      alert("Event submission failed: " + insertError.message);
    } else {
      alert("Event submitted for approval!");
      // Optionally reset form
      setForm({
        title: "",
        description: "",
        location: "",
        event_time: "",
        image: null,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <input
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <input
        name="event_time"
        type="datetime-local"
        value={form.event_time}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <input
        name="image"
        type="file"
        accept="image/*"
        onChange={handleChange}
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Submit
      </button>
    </form>
  );
}
