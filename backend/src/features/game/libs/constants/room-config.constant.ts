const ROOM_CONFIG = {
    easy: {
        timeForGame: 90_000,
        English: [
            'The sun is warm and the sky is blue. Birds sing in the trees and children play in the park. It is a nice day outside.',
            'I like to read books at home. My cat sits next to me on the sofa. We spend the evening together in peace.',
        ],
        Deutsch: [
            'Die Sonne scheint und der Himmel ist blau. Kinder spielen im Park und Vögel singen in den Bäumen. Es ist ein schöner Tag.',
            'Ich lese gerne Bücher zu Hause. Meine Katze sitzt neben mir auf dem Sofa. Wir verbringen den Abend gemeinsam in Ruhe.',
        ],
    },
    medium: {
        timeForGame: 60_000,
        English: [
            'Modern technology has changed the way people communicate with each other. Social media platforms allow users to share information instantly across the world.',
            'Regular exercise is essential for maintaining good health. Even a short walk each day can improve your mood and increase your energy levels significantly.',
        ],
        Deutsch: [
            'Die moderne Technologie hat die Art und Weise verändert, wie Menschen miteinander kommunizieren. Soziale Netzwerke ermöglichen es, Informationen sofort weltweit zu teilen.',
            'Regelmäßige Bewegung ist wichtig für die Gesundheit. Schon ein kurzer Spaziergang täglich kann die Stimmung verbessern und die Energie deutlich steigern.',
        ],
    },
    hard: {
        timeForGame: 30_000,
        English: [
            'The implementation of quantum computing algorithms presents extraordinary challenges for contemporary software engineers. Superposition and entanglement fundamentally redefine computational possibilities beyond classical binary systems.',
            'Neuroplasticity - the brains remarkable capacity to reorganize synaptic connections - suggests that cognitive rehabilitation following traumatic injury remains achievable well into adulthood, contradicting previously held assumptions.',
        ],
        Deutsch: [
            'Die Implementierung von Quantencomputing-Algorithmen stellt außerordentliche Herausforderungen für zeitgenössische Softwareingenieure dar. Superposition und Verschränkung definieren rechnerische Möglichkeiten grundlegend neu.',
            'Neuroplastizität - die bemerkenswerte Fähigkeit des Gehirns, synaptische Verbindungen neu zu organisieren - deutet darauf hin, dass kognitive Rehabilitation nach traumatischen Verletzungen bis ins Erwachsenenalter möglich bleibt.',
        ],
    },
};

export { ROOM_CONFIG };
