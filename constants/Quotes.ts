export interface Quote {
    id: string;
    text: string;
    author: string;
    category: QuoteCategory;
    source?: string;
    rating?: number;
    tags?: string[];
    views?: number;
    likes?: number;
    shares?: number;
    year?: number;
    originalLanguage?: string;
    readingTime?: number;
    difficulty?: 'easy' | 'medium' | 'hard';
    comments?: Comment[];
    relatedQuotes?: string[];
  }
  
  export interface Comment {
    id: string;
    userId: string;
    username: string;
    text: string;
    createdAt: string;
    likes?: number;
  }
  
  export type QuoteCategory = 'business' | 'love' | 'sports' | 'education' | 'general';
  
  export const quotes: Quote[] = [
    {
      id: '1',
      text: 'Başarı yolculuğunda en önemli adım başlamaktır.',
      author: 'Mark Twain',
      category: 'business',
      source: 'The Adventures of Tom Sawyer',
      rating: 4.8,
      year: 1876,
      originalLanguage: 'en',
      readingTime: 4,
      difficulty: 'easy',
      tags: ['başarı', 'motivasyon', 'başlangıç'],
      views: 1234,
      likes: 567,
      shares: 123,
      comments: [
        {
          id: 'c1',
          userId: 'u1',
          username: 'motivasyoncu',
          text: 'Bu söz hayatımı değiştirdi!',
          createdAt: '2024-03-15T10:00:00Z',
          likes: 12
        }
      ],
      relatedQuotes: ['2', '5', '7']
    },
    {
      id: '2',
      text: 'Hayatta en büyük başarı, asla düşmemek değil, her düştüğünde ayağa kalkabilmektir.',
      author: 'Konfüçyus',
      category: 'general'
    },
    {
      id: '3',
      text: 'Sevgi, hayatın en büyük öğretmenidir.',
      author: 'Platon',
      category: 'love'
    },
    {
      id: '4',
      text: 'Spor sadece bedeni değil, ruhu da güçlendirir.',
      author: 'Anonim',
      category: 'sports'
    },
    {
      id: '5',
      text: 'Eğitim, karanlıktan aydınlığa açılan kapıdır.',
      author: 'Aristoteles',
      category: 'education'
    },
    {
      id: '6',
      text: 'Başarılı insanlar, başarısızlıktan korkmayanlardır.',
      author: 'Anonim',
      category: 'business'
    },
    {
      id: '7',
      text: 'Hayatta hiçbir şey imkansız değildir. Sadece zaman alır.',
      author: 'Nelson Mandela',
      category: 'general'
    },
    {
      id: '8',
      text: 'Aşk, sabır ve anlayış gerektirir.',
      author: 'Anonim',
      category: 'love'
    },
    {
      id: '9',
      text: 'Antrenmanlar vücudu geliştirir, iradeyi ise güçlendirir.',
      author: 'Michael Jordan',
      category: 'sports'
    },
    {
      id: '10',
      text: 'Öğrenmenin sınırı yoktur. Hayat boyunca öğrenmeye devam et.',
      author: 'Sokrates',
      category: 'education'
    },
    {
      id: '11',
      text: 'Başarı, her gün tekrarlanan küçük adımlarla gelir.',
      author: 'Anonim',
      category: 'business'
    },
    {
      id: '12',
      text: 'Mutlu olmak için bekleme. Mutluluğu kendin yarat.',
      author: 'Dalai Lama',
      category: 'general'
    },
    {
      id: '13',
      text: 'Gerçek aşk, koşulsuz olandır.',
      author: 'Anonim',
      category: 'love'
    },
    {
      id: '14',
      text: 'Kaybetmekten korkma, denememekten kork.',
      author: 'Muhammed Ali',
      category: 'sports'
    },
    {
      id: '15',
      text: 'Eğitim, hayatını değiştirme gücünü verir.',
      author: 'Nelson Mandela',
      category: 'education'
    },
    {
      id: '16',
      text: 'Yüksek hedeflere ulaşmak için büyük hayaller kur.',
      author: 'Anonim',
      category: 'business'
    },
    {
      id: '17',
      text: 'Her karanlık gece, yeni bir günle sona erer.',
      author: 'Anonim',
      category: 'general'
    },
    {
      id: '18',
      text: 'Aşk, dünyanın en büyük gücüdür.',
      author: 'Mahatma Gandhi',
      category: 'love'
    },
    {
      id: '19',
      text: 'Zafer, çalışmayı bırakmayanlarındır.',
      author: 'Anonim',
      category: 'sports'
    },
    {
      id: '20',
      text: 'Bilgi güçtür. Öğrenmek seni özgürleştirir.',
      author: 'Francis Bacon',
      category: 'education'
    },
    {
      id: '21',
      text: 'Başarısızlık, başarıya giden yoldaki en büyük öğretmendir.',
      author: 'Anonim',
      category: 'business'
    },
    {
      id: '22',
      text: 'İmkansızı başaranlar, denemekten asla vazgeçmeyenlerdir.',
      author: 'Thomas Edison',
      category: 'general'
    },
    {
      id: '23',
      text: 'Gerçek aşk, her şeye rağmen devam edendir.',
      author: 'Anonim',
      category: 'love'
    },
    {
      id: '24',
      text: 'Zihin güçlüdür, beden zayıfsa gelişemez.',
      author: 'Anonim',
      category: 'sports'
    },
    {
      id: '25',
      text: 'Öğrenmek, ömür boyu devam eden bir süreçtir.',
      author: 'Anonim',
      category: 'education'
    },
    // ... 75 adet daha devam edebilir
  ];
  
  export const categories: Record<QuoteCategory, string> = {
    business: 'İş Hayatı',
    love: 'Aşk',
    sports: 'Spor',
    education: 'Eğitim',
    general: 'Genel'
  };
  
  // Önceki sözleri takip etmek için
  let recentQuotes: string[] = [];
  const MAX_RECENT = 10; // Son 10 sözü takip et
  
  export function getRandomQuote(category: QuoteCategory): Quote {
    // Kategorideki tüm sözleri filtrele
    const categoryQuotes = quotes.filter(q => q.category === category);
    
    // Son görüntülenen sözleri çıkar
    const availableQuotes = categoryQuotes.filter(q => !recentQuotes.includes(q.id));
    
    // Eğer tüm sözler görüntülendiyse, geçmişi temizle
    if (availableQuotes.length === 0) {
      recentQuotes = [];
      return categoryQuotes[Math.floor(Math.random() * categoryQuotes.length)];
    }
    
    // Random söz seç
    const randomQuote = availableQuotes[Math.floor(Math.random() * availableQuotes.length)];
    
    // Geçmişe ekle
    recentQuotes.push(randomQuote.id);
    if (recentQuotes.length > MAX_RECENT) {
      recentQuotes.shift(); // En eski sözü çıkar
    }
    
    return randomQuote;
  }
  