import React from "react";

interface Bar {
  sportnames: { id: number; name: string }[];
  Userselected: number | null;
  userSport: (UserselectedId: number | null) => void;
  Orderchange: (sortOption: string) => void;
}

const ArticleBar: React.FC<Bar> = ({ sportnames, Userselected, userSport, Orderchange }) => {
  const showAllSports = () => {
    // Pass null to indicate that no sport is selected
    userSport(null);
  };

  return (
    <div className="flex justify-around mb-1 overflow-x-auto bg-[#c7e3e2] rounded-lg p-3">
      <div className="rounded-lg px-5 py-1 bg-[#88c2c0]">
        <label className="text-xl font-bold text-zinc-700 mr-3">Sort:</label>
        <select
          className="rounded-lg px-3 bg-[#88c2c0] text-zinc-700 hover:text-zinc-950 font-bold border-zinc-700 border"
          onChange={(e) => Orderchange(e.target.value)}
        >
          <option value="date">Date</option>
          <option value="AZ">A-Z</option>
          <option value="ZA">Z-A</option>
        </select>
      </div>
      <button
        className={`text-xl font-bold text-zinc-700 hover:text-zinc-900 ml-14 ${Userselected === null ? 'border-b-4 border-dotted  border-zinc-700' : ''}`}
        onClick={showAllSports}
      >
        All News
      </button>
      {sportnames.map((sport) => (
        <button
          key={sport.id}
          className={`text-xl font-bold text-zinc-700 hover:text-zinc-900 ml-14 ${Userselected === sport.id ? 'border-b-4 border-dotted  border-zinc-700' : ''}`}
          onClick={() => userSport(sport.id)}
        >
          {sport.name}
        </button>
      ))}
    </div>
  );
};

export default ArticleBar;
