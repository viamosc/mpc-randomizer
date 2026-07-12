import React, { useState } from "react";

// ---------- helpers ----------
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeTeams(names) {
  const shuffled = shuffle(names);
  const teams = [];
  for (let i = 0; i < shuffled.length; i += 2) {
    teams.push(shuffled.slice(i, i + 2));
  }
  return teams;
}

// ---------- modular components ----------

function NameInput({ label, names, setNames }) {
  const [value, setValue] = useState("");

  const addName = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setNames([...names, trimmed]);
    setValue("");
  };

  const removeName = (idx) => {
    setNames(names.filter((_, i) => i !== idx));
  };

  return (
    <div style={styles.inputBlock}>
      <h3 style={styles.inputLabel}>{label}</h3>
      <div style={styles.inputRow}>
        <input
          style={styles.textInput}
          value={value}
          placeholder="Enter a name"
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addName()}
        />
        <button style={styles.addBtn} onClick={addName}>
          Add
        </button>
      </div>
      <div style={styles.chipRow}>
        {names.map((n, i) => (
          <span key={i} style={styles.chip}>
            {n}
            <button style={styles.chipRemove} onClick={() => removeName(i)}>
              ×
            </button>
          </span>
        ))}
        {names.length === 0 && (
          <span style={styles.emptyHint}>No names yet.</span>
        )}
      </div>
    </div>
  );
}

function TeamDisplay({ label, teams, onAssign }) {
  return (
    <div style={styles.teamSection}>
      <div style={styles.teamHeaderRow}>
        <h3 style={{ ...styles.inputLabel, margin: 0 }}>{label} teams</h3>
        <button style={styles.assignBtnSmall} onClick={onAssign}>
          Assign teams
        </button>
      </div>
      {!teams ? (
        <span style={styles.emptyHint}>Not assigned yet.</span>
      ) : teams.length === 0 ? (
        <span style={styles.emptyHint}>No players to assign.</span>
      ) : (
        <div style={styles.teamGrid}>
          {teams.map((team, i) => (
            <div style={styles.teamCard} key={i}>
              <div style={styles.teamNumber}>Team {i + 1}</div>
              <div style={styles.teamPlayers}>
                {team.length === 2
                  ? `${team[0]} & ${team[1]}`
                  : team.join(", ") + " (odd one out)"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------- main app ----------

export default function App() {
  const [beginnerNames, setBeginnerNames] = useState([]);
  const [noviceNames, setNoviceNames] = useState([]);
  const [beginnerTeams, setBeginnerTeams] = useState(null);
  const [noviceTeams, setNoviceTeams] = useState(null);

  const assignBeginnerTeams = () => setBeginnerTeams(makeTeams(beginnerNames));
  const assignNoviceTeams = () => setNoviceTeams(makeTeams(noviceNames));

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <p style={styles.eyebrow}>Miagao Pickleball Club</p>
        <h1 style={styles.title}>Challenger's Night</h1>
        <div style={styles.kitchenLine} />
        <p style={styles.subtitle}>Random team maker</p>
      </header>

      <section style={styles.grid}>
        <NameInput
          label="Beginner"
          names={beginnerNames}
          setNames={setBeginnerNames}
        />
        <NameInput
          label="Novice"
          names={noviceNames}
          setNames={setNoviceNames}
        />
      </section>

      <section style={styles.grid}>
        <TeamDisplay
          label="Beginner"
          teams={beginnerTeams}
          onAssign={assignBeginnerTeams}
        />
        <TeamDisplay
          label="Novice"
          teams={noviceTeams}
          onAssign={assignNoviceTeams}
        />
      </section>
    </div>
  );
}

// ---------- styles ----------

const styles = {
  page: {
    minHeight: "100vh",
    background: "#F6F7F2",
    color: "#16241F",
    fontFamily: "Arial, sans-serif",
    padding: "48px 24px 80px",
    maxWidth: 720,
    margin: "0 auto",
  },
  header: {
    marginBottom: 40,
  },
  eyebrow: {
    margin: 0,
    fontSize: 12,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#5B7A6C",
    fontWeight: 600,
  },
  title: {
    margin: "4px 0 0",
    fontSize: 34,
    fontWeight: 700,
    letterSpacing: "-0.02em",
  },
  kitchenLine: {
    marginTop: 16,
    height: 0,
    borderTop: "2px dashed #C7D3C2",
  },
  subtitle: {
    marginTop: 14,
    fontSize: 14,
    color: "#5B7A6C",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 24,
    marginBottom: 8,
  },
  inputBlock: {
    background: "#FFFFFF",
    border: "1px solid #E3E7DE",
    borderRadius: 10,
    padding: "18px 18px 16px",
  },
  inputLabel: {
    margin: "0 0 12px",
    fontSize: 15,
    fontWeight: 600,
  },
  inputRow: {
    display: "flex",
    gap: 8,
    marginBottom: 12,
  },
  textInput: {
    flex: 1,
    height: 36,
    padding: "0 10px",
    borderRadius: 6,
    border: "1px solid #D5DBD0",
    fontSize: 14,
    outline: "none",
  },
  addBtn: {
    height: 36,
    padding: "0 14px",
    borderRadius: 6,
    border: "1px solid #16241F",
    background: "#16241F",
    color: "#F6F7F2",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },
  chipRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: "#EEF3E8",
    color: "#2E4A3B",
    borderRadius: 20,
    padding: "5px 6px 5px 12px",
    fontSize: 13,
  },
  chipRemove: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 15,
    lineHeight: 1,
    color: "#5B7A6C",
    padding: "0 4px",
  },
  emptyHint: {
    fontSize: 13,
    color: "#8B958D",
  },
  teamSection: {
    background: "#FFFFFF",
    border: "1px solid #E3E7DE",
    borderRadius: 10,
    padding: "18px 18px 16px",
  },
  teamHeaderRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  assignBtnSmall: {
    height: 32,
    padding: "0 14px",
    borderRadius: 6,
    border: "none",
    background: "#C6E24C",
    color: "#16241F",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
  },
  teamGrid: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  teamCard: {
    border: "1px solid #E3E7DE",
    borderRadius: 8,
    padding: "10px 12px",
  },
  teamNumber: {
    fontSize: 11,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#5B7A6C",
    fontWeight: 700,
    marginBottom: 2,
  },
  teamPlayers: {
    fontSize: 14,
    fontWeight: 500,
  },
};