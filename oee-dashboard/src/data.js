// Dodajemy 'export', aby funkcja była dostępna w innych plikach
export const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const generateInitialData = () => {
  const machineTypes = [
    { prefix: "CNC", name: "Frezarka Haas VF-2", baseTemp: 40 },
    { prefix: "INJ", name: "Wtryskarka Engel 500", baseTemp: 180 },
    { prefix: "ROB", name: "Ramię KUKA KR", baseTemp: 25 },
    { prefix: "LAS", name: "Laser Trumpf 3030", baseTemp: 35 }
  ];

  // Usunąłem 'index', bo go nie używamy
  return machineTypes.map((type) => {
    const statusRoll = Math.random();
    let status = "run";
    if (statusRoll > 0.85) status = "down";
    else if (statusRoll > 0.70) status = "idle";

    const target = getRandom(1000, 5000);
    const produced = status === "down" ? getRandom(0, 100) : getRandom(100, target * 0.8);
    
    const history = Array.from({ length: 10 }, () => 
      status === "down" ? getRandom(0, 20) : getRandom(60, 95)
    );

    return {
      id: `${type.prefix}-${getRandom(10, 99)}`,
      name: type.name,
      status: status,
      oee: status === "down" ? 0 : getRandom(65, 98),
      produced: Math.floor(produced),
      target: target,
      temperature: type.baseTemp + getRandom(-5, 15),
      history: history
    };
  });
};