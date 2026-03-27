// --- MASSIVE DATA DICTIONARY FOR PREDICTIONS ---
const zodiacSigns = [
    "Capricorn", "Aquarius", "Pisces", "Aries", "Taurus", "Gemini",
    "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius"
];

const spiritAnimals = [
    "The Majestic Wolf (Loyal, Instinctual)", "The Clever Fox (Cunning, Agile)", 
    "The Wise Owl (Observant, Intuitive)", "The Fierce Lion (Brave, Natural Leader)", 
    "The Serene Turtle (Patient, Grounded)", "The Free Falcon (Visionary, Unbound)"
];

const luckyColors = ["Deep Amethyst", "Emerald Green", "Crimson Red", "Midnight Blue", "Obsidian Black", "Goldenrod"];

const compliments = [
    "Your intuition is bordering on psychic lately.",
    "People are secretly inspired by your resilience.",
    "You have an aura that naturally calms chaotic environments.",
    "Your ability to adapt to sudden changes is your greatest hidden weapon.",
    "You possess a rare alignment of logical intellect and deep empathy.",
    "The universe recognizes your silent sacrifices."
];

const victimCardCompliments = [
    "You carry burdens that aren't yours, yet smile as if they are weightless.",
    "You continuously pour from an empty cup for people who won't even hold the glass.",
    "Your loyalty is absolute, even when dealing with temporary people.",
    "People mistake your kindness for weakness; the cosmos knows it is your greatest strength.",
    "You act as a therapist for everyone, yet process your own storms in complete silence."
];

const predictions = [
    "A major financial paradigm shift is approaching within the next 4 moons.",
    "An unresolved connection from your past is about to bring closure, or chaos.",
    "Your current struggle is exactly the catalyst required for your impending breakthrough.",
    "Prepare for a geographical shift; travel or relocation is written in the stars.",
    "The project you are doubting right now will be your biggest legacy.",
    "A sudden moment of extreme clarity will soon change your career trajectory permanently."
];

const loveLife = [
    "A deep, soulful connection is entering your orbit; do not rush to categorize it.",
    "Your current independent and mysterious streak is secretly attracting admirers from afar.",
    "A past flame may try to seek closure, but you must keep your eyes fixed on your current path.",
    "Your aura is highly magnetic right now. Expect heightened romantic attention this moon cycle.",
    "You are overthinking a dynamic that is actually quite simple. Trust their actions, not their promises.",
    "True alignment in romance will only occur once you fully forgive a specific betrayal from your past."
];

const careerPath = [
    "A sudden pivot in your professional life will bring both initial chaos and massive long-term reward.",
    "Your unmatched, quiet dedication is being closely noticed by someone with the power to elevate you.",
    "Avoid office politics this quarter. A silent, steady grind will result in an unexpected promotion.",
    "An unconventional side-hustle or passion project has the energy to soon overshadow your primary income.",
    "You are exactly where you need to be. Your next major leap requires this current period of grounding.",
    "A financial dispute or professional negotiation will end heavily in your favor if you firmly simply hold your ground."
];

const warnings = [
    "Beware of making permanent decisions based on temporary emotional spikes this week.",
    "Someone in your inner circle is draining your energy. Strengthen your boundaries immediately.",
    "Stop ignoring your physical exhaustion. Rest is utterly required for the upcoming phase.",
    "Do not trust the very first shiny opportunity that presents itself on a Tuesday.",
    "You are overthinking a situation that has already been resolved in the spiritual realm. Let it go.",
    "Guard your finances closely; an unexpected and unnecessary allure will strongly tempt you soon."
];

// --- APP LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('astroForm');
    const loadZone = document.getElementById('loading-zone');
    const resultZone = document.getElementById('result-zone');
    const cardsContainer = document.getElementById('destiny-cards');
    const resetBtn = document.getElementById('reset-btn');
    const loadText = document.getElementById('loading-text');

    // Deterministic Pseudo-Random Generator based on seed
    // Ensures if a user types the *exact* same data, they get the exact same reading!
    function seededRandomInt(seedStr, max) {
        let hash = 0;
        for (let i = 0; i < seedStr.length; i++) {
            hash = seedStr.charCodeAt(i) + ((hash << 5) - hash);
        }
        let x = Math.sin(hash++) * 10000;
        return Math.floor((Math.abs(x) - Math.floor(Math.abs(x))) * max);
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Collect State
        const name = document.getElementById('name').value.trim();
        const surname = document.getElementById('surname').value.trim();
        const day = parseInt(document.getElementById('day').value);
        const month = parseInt(document.getElementById('month').value);
        const year = parseInt(document.getElementById('year').value);

        // UI Transition to Loading Phase
        form.classList.add('hidden');
        loadZone.classList.remove('hidden');

        // Dynamic Loading Text Sequence
        const loadingSequences = ["Aligning the planets...", "Mapping your star chart...", "Consulting ancient spirits...", "Finalizing your prophecy..."];
        let seqInt = 0;
        const loadTimer = setInterval(() => {
            seqInt++;
            if(seqInt < loadingSequences.length) {
                loadText.innerText = loadingSequences[seqInt];
            }
        }, 800);

        // Core Generation Logic
        setTimeout(() => {
            clearInterval(loadTimer);
            generateReading(name, surname, day, month, year);
        }, 3000);
    });

    function generateReading(name, surname, day, month, year) {
        // Base Seed combinations
        const seed1 = `${name.toLowerCase()}${surname.toLowerCase()}${year}`;
        const seed2 = `${day}${month}${name.toLowerCase()}`;
        const seed3 = `${year}${month}${surname.toLowerCase()}`;

        // Zodiac is fixed math based on month
        const zodiac = zodiacSigns[month - 1]; 

        // Generate attributes
        const spirit = spiritAnimals[seededRandomInt(seed1, spiritAnimals.length)];
        const color = luckyColors[seededRandomInt(seed2, luckyColors.length)];
        
        // Generate lucky numbers safely
        let l1 = seededRandomInt(seed1, 99) + 1;
        let l2 = seededRandomInt(seed2, 99) + 1;
        let l3 = seededRandomInt(seed3, 99) + 1;
        if(l1===l2) l2 = (l2 % 99) + 1; if(l2===l3) l3 = (l3 % 99) + 1;

        // Generate mystical texts
        const comp = compliments[seededRandomInt(seed3, compliments.length)];
        const vic = victimCardCompliments[seededRandomInt(seed1, victimCardCompliments.length)];
        const pred = predictions[seededRandomInt(seed2, predictions.length)];
        const love = loveLife[seededRandomInt(`${month}${year}`, loveLife.length)];
        const career = careerPath[seededRandomInt(`${surname}${day}`, careerPath.length)];
        const warn = warnings[seededRandomInt(seed3, warnings.length)];

        // Build UI Cards
        cardsContainer.innerHTML = `
            <div class="destiny-card">
                <div class="card-title">Cosmic Anchor</div>
                <div class="card-data">
                    You are a <span class="highlight">${zodiac}</span>.<br><br>
                    Your auric color is <strong style="color:#fcd34d">${color}</strong> and your guiding spirit animal is <strong style="color:#fcd34d">${spirit}</strong>.
                </div>
            </div>
            
            <div class="destiny-card">
                <div class="card-title">Lucky Alignment</div>
                <div class="card-data">
                    Your dimensional coordinates generated these prime numbers of physical fortune:<br><br>
                    <span class="highlight" style="font-size:1.6rem">${l1} • ${l2} • ${l3}</span>
                </div>
            </div>

            <div class="destiny-card" style="border-top-color: #f43f5e;">
                <div class="card-title" style="color: #f43f5e;">Love & Romance</div>
                <div class="card-data">${love}</div>
            </div>

            <div class="destiny-card" style="border-top-color: #38bdf8;">
                <div class="card-title" style="color: #38bdf8;">Career & Wealth</div>
                <div class="card-data">${career}</div>
            </div>

            <div class="destiny-card">
                <div class="card-title">The Hidden Truth & Prophecy</div>
                <div class="card-data">
                    <em>${comp}</em><br><br>
                    But the stars also see your quiet pain. ${vic}<br><br>
                    <strong>The Prophecy:</strong> <span class="highlight">${pred}</span>
                </div>
            </div>

            <div class="destiny-card" style="border-top-color: #ef4444;">
                <div class="card-title" style="color: #ef4444; text-transform:uppercase; letter-spacing:1px"><span style="font-size:1.3rem">⚠️</span> Celestial Warning</div>
                <div class="card-data">${warn}</div>
            </div>
        `;

        // UI Reveal
        loadZone.classList.add('hidden');
        resultZone.classList.remove('hidden');
    }

    resetBtn.addEventListener('click', () => {
        resultZone.classList.add('hidden');
        form.classList.remove('hidden');
        form.reset();
        loadText.innerText = "Aligning the planets...";
    });
});
