// TestAni.jsx

import React, { useState } from 'react';
import TableTest from '../components/TableTest';

const TestAni = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAnimateClick = () => {
    setIsAnimating(true);
    // Add your animation logic here if needed
  };

  // Nested dictionary
  const results = {
        0: {
            table_name: 'Albums',
            data: [
            {
                "album_id": 101,
                "album_name": "Greatest Hits",
                "year": 1995,
                "artist_id": 201,
            },
            {"album_id": 102, "album_name": "Rock Anthems", "year": 2002, "artist_id": 202},
            {
                "album_id": 103,
                "album_name": "Pop Sensations",
                "year": 2010,
                "artist_id": 203,
            },
            {"album_id": 104, "album_name": "Classic Jazz", "year": 1998, "artist_id": 204},
            {
                "album_id": 105,
                "album_name": "Country Roads",
                "year": 2005,
                "artist_id": 205,
            },
            {"album_id": 106, "album_name": "R&B Grooves", "year": 2012, "artist_id": 206},
            {
                "album_id": 107,
                "album_name": "Indie Classics",
                "year": 2008,
                "artist_id": 207,
            },
            {"album_id": 108, "album_name": "Hip Hop Hits", "year": 2015, "artist_id": 208},
            {
                "album_id": 109,
                "album_name": "Electronic Vibes",
                "year": 2006,
                "artist_id": 209,
            },
            {
                "album_id": 110,
                "album_name": "Blues Legends",
                "year": 1997,
                "artist_id": 210,
            },
            {"album_id": 111, "album_name": "Reggae Roots", "year": 2011, "artist_id": 211},
            {
                "album_id": 112,
                "album_name": "Classical Masterpieces",
                "year": 2000,
                "artist_id": 212,
            },
            {
                "album_id": 113,
                "album_name": "Alternative Rewind",
                "year": 2009,
                "artist_id": 213,
            },
            {"album_id": 114, "album_name": "Metal Mayhem", "year": 2014, "artist_id": 214},
            {"album_id": 115, "album_name": "Latin Salsa", "year": 2003, "artist_id": 215},
            {
                "album_id": 116,
                "album_name": "Funky Grooves",
                "year": 2007,
                "artist_id": 216,
            },
            {
                "album_id": 117,
                "album_name": "Bollywood Beats",
                "year": 2013,
                "artist_id": 217,
            },
            {
                "album_id": 118,
                "album_name": "Soulful Sounds",
                "year": 1999,
                "artist_id": 218,
            },
            {
                "album_id": 119,
                "album_name": "Ambient Dreams",
                "year": 2016,
                "artist_id": 219,
            },
            {
                "album_id": 120,
                "album_name": "Gospel Favorites",
                "year": 2004,
                "artist_id": 220,
            },    
        ],
    },
            1: {
                table_name: 'Songs',
                data: [
            {"song_id": 1001, "song_title": "Bohemian Rhapsody", "album_id": 101},
            {"song_id": 1002, "song_title": "Paint It Black", "album_id": 102},
            {"song_id": 1003, "song_title": "Shake It Off", "album_id": 103},
            {"song_id": 1004, "song_title": "So What", "album_id": 104},
            {"song_id": 1005, "song_title": "Ring of Fire", "album_id": 105},
            {"song_id": 1006, "song_title": "Love On Top", "album_id": 106},
            {"song_id": 1007, "song_title": "Do I Wanna Know?", "album_id": 107},
            {"song_id": 1008, "song_title": "Lose Yourself", "album_id": 108},
            {"song_id": 1009, "song_title": "Around the World", "album_id": 109},
            {"song_id": 1010, "song_title": "The Thrill Is Gone", "album_id": 110},
            {"song_id": 1011, "song_title": "One Love", "album_id": 111},
            {"song_id": 1012, "song_title": "Moonlight Sonata", "album_id": 112},
            {"song_id": 1013, "song_title": "Smells Like Teen Spirit", "album_id": 113},
            {"song_id": 1014, "song_title": "Enter Sandman", "album_id": 114},
            {"song_id": 1015, "song_title": "Suavemente", "album_id": 115},
            {"song_id": 1016, "song_title": "Get Up (I Feel Like A)", "album_id": 116},
            {"song_id": 1017, "song_title": "Chaiyya Chaiyya", "album_id": 117},
            {"song_id": 1018, "song_title": "Respect", "album_id": 118},
            {"song_id": 1019, "song_title": "Ambient Bliss", "album_id": 119},
            {"song_id": 1020, "song_title": "Amazing Grace", "album_id": 120},    
        ],
    },
            2: {
                table_name: 'Albums and Songs',
                data: [
            {
                "album_id": 101,
                "album_name": "Greatest Hits",
                "year": 1995,
                "artist_id": 201,
                "song_id": 1001,
                "song_title": "Bohemian Rhapsody",
            },
            {
                "album_id": 102,
                "album_name": "Rock Anthems",
                "year": 2002,
                "artist_id": 202,
                "song_id": 1002,
                "song_title": "Paint It Black",
            },
            {
                "album_id": 103,
                "album_name": "Pop Sensations",
                "year": 2010,
                "artist_id": 203,
                "song_id": 1003,
                "song_title": "Shake It Off",
            },
            {
                "album_id": 104,
                "album_name": "Classic Jazz",
                "year": 1998,
                "artist_id": 204,
                "song_id": 1004,
                "song_title": "So What",
            },
            {
                "album_id": 105,
                "album_name": "Country Roads",
                "year": 2005,
                "artist_id": 205,
                "song_id": 1005,
                "song_title": "Ring of Fire",
            },
            {
                "album_id": 106,
                "album_name": "R&B Grooves",
                "year": 2012,
                "artist_id": 206,
                "song_id": 1006,
                "song_title": "Love On Top",
            },
            {
                "album_id": 107,
                "album_name": "Indie Classics",
                "year": 2008,
                "artist_id": 207,
                "song_id": 1007,
                "song_title": "Do I Wanna Know?",
            },
            {
                "album_id": 108,
                "album_name": "Hip Hop Hits",
                "year": 2015,
                "artist_id": 208,
                "song_id": 1008,
                "song_title": "Lose Yourself",
            },
            {
                "album_id": 109,
                "album_name": "Electronic Vibes",
                "year": 2006,
                "artist_id": 209,
                "song_id": 1009,
                "song_title": "Around the World",
            },
            {
                "album_id": 110,
                "album_name": "Blues Legends",
                "year": 1997,
                "artist_id": 210,
                "song_id": 1010,
                "song_title": "The Thrill Is Gone",
            },
            {
                "album_id": 111,
                "album_name": "Reggae Roots",
                "year": 2011,
                "artist_id": 211,
                "song_id": 1011,
                "song_title": "One Love",
            },
            {
                "album_id": 112,
                "album_name": "Classical Masterpieces",
                "year": 2000,
                "artist_id": 212,
                "song_id": 1012,
                "song_title": "Moonlight Sonata",
            },
            {
                "album_id": 113,
                "album_name": "Alternative Rewind",
                "year": 2009,
                "artist_id": 213,
                "song_id": 1013,
                "song_title": "Smells Like Teen Spirit",
            },
            {
                "album_id": 114,
                "album_name": "Metal Mayhem",
                "year": 2014,
                "artist_id": 214,
                "song_id": 1014,
                "song_title": "Enter Sandman",
            },
            {
                "album_id": 115,
                "album_name": "Latin Salsa",
                "year": 2003,
                "artist_id": 215,
                "song_id": 1015,
                "song_title": "Suavemente",
            },
            {
                "album_id": 116,
                "album_name": "Funky Grooves",
                "year": 2007,
                "artist_id": 216,
                "song_id": 1016,
                "song_title": "Get Up (I Feel Like A)",
            },
            {
                "album_id": 117,
                "album_name": "Bollywood Beats",
                "year": 2013,
                "artist_id": 217,
                "song_id": 1017,
                "song_title": "Chaiyya Chaiyya",
            },
            {
                "album_id": 118,
                "album_name": "Soulful Sounds",
                "year": 1999,
                "artist_id": 218,
                "song_id": 1018,
                "song_title": "Respect",
            },
            {
                "album_id": 119,
                "album_name": "Ambient Dreams",
                "year": 2016,
                "artist_id": 219,
                "song_id": 1019,
                "song_title": "Ambient Bliss",
            },
            {
                "album_id": 120,
                "album_name": "Gospel Favorites",
                "year": 2004,
                "artist_id": 220,
                "song_id": 1020,
                "song_title": "Amazing Grace",
            },    
        ],
    },
            3: {
                table_name: 'Partial Data',
                data: [
            {
                "album_id": 101,
                "album_name": "Greatest Hits",
                "year": 1995,
                "artist_id": 201,
                "song_id": 1001,
                "song_title": "Bohemian Rhapsody",
            },
            {
                "album_id": 102,
                "album_name": "Rock Anthems",
                "year": 2002,
                "artist_id": 202,
                "song_id": 1002,
                "song_title": "Paint It Black",
            },
            {
                "album_id": 103,
                "album_name": "Pop Sensations",
                "year": 2010,
                "artist_id": 203,
                "song_id": 1003,
                "song_title": "Shake It Off",
            },
            {
                "album_id": 104,
                "album_name": "Classic Jazz",
                "year": 1998,
                "artist_id": 204,
                "song_id": 1004,
                "song_title": "So What",
            },
            {
                "album_id": 105,
                "album_name": "Country Roads",
                "year": 2005,
                "artist_id": 205,
                "song_id": 1005,
                "song_title": "Ring of Fire",
            },    
        ],
    },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <button onClick={handleAnimateClick} style={{ padding: '10px', fontSize: '16px', margin: '10px' }}>
        Animate
      </button>
      <div
        style={{
          width: '1000px',
          height: '1000px',
          backgroundColor: isAnimating ? '#f2f2f2' : 'transparent', // Initial background color
          borderRadius: '10px',
          margin: '10px',
          overflow: 'auto',
          transition: 'background-color 1s ease-in-out',
        }}
      >
        {isAnimating && (
          <>
            {Object.keys(results).map((key, index, array) => (
              <React.Fragment key={key}>
                <TableTest tableName={results[key].table_name} data={results[key].data} />
                {index < array.length - 1 && (
                  <div style={{ textAlign: 'center', margin: '10px', fontSize: '50px' }}>
                    <span>&#8595;</span>
                  </div>
                )}
              </React.Fragment>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default TestAni;