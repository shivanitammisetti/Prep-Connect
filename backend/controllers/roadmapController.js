exports.getRoadmaps = (req, res) => {
  const roadmaps = [
    { id: 1, title: 'Data Structures & Algorithms', duration: '12 Weeks', topics: ['Arrays', 'Trees', 'Graphs'] },
    { id: 2, title: 'Full Stack Web Dev', duration: '16 Weeks', topics: ['React', 'Node.js', 'MongoDB'] },
    { id: 3, title: 'Core Subjects', duration: '8 Weeks', topics: ['OS', 'DBMS', 'Networking'] }
  ];
  res.json(roadmaps);
};