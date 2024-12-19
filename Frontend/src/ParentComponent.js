import React, { useState } from 'react';
import Profile from './Profile';

const ParentComponent = () => {
  const [sharedSkills, setSharedSkills] = useState([]);
  const [learnedSkills, setLearnedSkills] = useState([]);

  // Function to handle sharing a skill
  const handleShareSkill = (skill) => {
    console.log("Skill shared:", skill);  // Debugging line
    setSharedSkills((prevSkills) => [...prevSkills, skill]);
  };

  // Function to handle learning preferences
  const handleLearnSkill = (preference) => {
    console.log("Preference learned:", preference);  // Debugging line
    setLearnedSkills((prevPreferences) => [...prevPreferences, preference]);
  };

  return (
    <div>
      <Profile 
        onShareSkill={handleShareSkill} 
        onLearnSkill={handleLearnSkill} 
      />
      {/* Other components can go here */}
    </div>
  );
};

export default ParentComponent;
