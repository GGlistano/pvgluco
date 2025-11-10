import { Search, MoreVertical, ThumbsUp, ThumbsDown, Share2, MessageCircle, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Comment {
  id: string;
  text: string;
  timestamp: number;
  likes: number;
  likedByUser: boolean;
}

const staticComments = [
  { id: 's1', name: 'Marcia L', text: 'Yo también cambié mi alimentación, no empecé a hacer ejercicio. Solo comencé con esta receta. Mi energía está aumentando.', color: 'blue', initial: 'M', likes: 342 },
  { id: 's2', name: 'Luis H', text: 'OK... normalmente suelo estos videos largos. Pero el cada segundo cuenta. Algo que no he hablado en años.', color: 'green', initial: 'L', likes: 89 },
  { id: 's3', name: 'Maria Delgado', text: 'No voy a mentir — al principio pensé que una estafa. Pero lo seguí. Vieja lo que dice mi doctor de diabetes en menos de 7 días...', color: 'purple', initial: 'M', likes: 567 },
  { id: 's4', name: 'Rosa Elena M', text: 'Mi médico estaba escéptico, pero compré el paquete de 6 frascos. Una semana después, ya me siento como una nueva persona.', color: 'red', initial: 'R', likes: 234 },
  { id: 's5', name: 'Rosa Elena M', text: 'Es real, pero espera que mis niveles están estables por primera vez en 10 años.', color: 'orange', initial: 'R', likes: 456 },
  { id: 's6', name: 'Miguel Angel Torres', text: 'Solo quería dormir mejor, pero terminé bajando mi glucosa en 6 días. Me siento más ligero, con más ánimo.', color: 'teal', initial: 'M', likes: 123 },
  { id: 's7', name: 'Jorge Jiménez', text: 'Lovi en Facebook y pensé "una cosa más para vender". Pero me funciona. 2 frascos y MUCHO ha cambiado.', color: 'pink', initial: 'J', likes: 678 }
];

function App() {
  const [viewCount, setViewCount] = useState(3897);
  const [isLive, setIsLive] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [videoLiked, setVideoLiked] = useState(false);
  const [videoLikeCount, setVideoLikeCount] = useState(3897);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://scripts.converteai.net/9d93e4b2-3654-4bea-bda0-107c1328d520/players/69111ec6230c7d2caf64bcd1/v4/player.js';
    script.async = true;
    document.head.appendChild(script);

    const interval = setInterval(() => {
      setViewCount(prev => prev + Math.floor(Math.random() * 5));
    }, 3000);

    const savedComments = localStorage.getItem('userComments');
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }

    const savedVideoLike = localStorage.getItem('videoLiked');
    if (savedVideoLike === 'true') {
      setVideoLiked(true);
    }

    const savedVideoLikeCount = localStorage.getItem('videoLikeCount');
    if (savedVideoLikeCount) {
      setVideoLikeCount(parseInt(savedVideoLikeCount));
    }

    return () => {
      clearInterval(interval);
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const handleAddComment = () => {
    if (commentText.trim() === '') return;

    const newComment: Comment = {
      id: Date.now().toString(),
      text: commentText,
      timestamp: Date.now(),
      likes: 0,
      likedByUser: false
    };

    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
    localStorage.setItem('userComments', JSON.stringify(updatedComments));
    setCommentText('');
  };

  const handleLikeComment = (commentId: string) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.likedByUser ? comment.likes - 1 : comment.likes + 1,
          likedByUser: !comment.likedByUser
        };
      }
      return comment;
    });
    setComments(updatedComments);
    localStorage.setItem('userComments', JSON.stringify(updatedComments));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddComment();
    }
  };

  const handleVideoLike = () => {
    if (!videoLiked) {
      const newCount = videoLikeCount + 1;
      setVideoLiked(true);
      setVideoLikeCount(newCount);
      localStorage.setItem('videoLiked', 'true');
      localStorage.setItem('videoLikeCount', newCount.toString());
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-black px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <img
          src="/logotipoyt.png"
          alt="YouTube"
          className="h-10 object-contain"
        />
        <div className="flex items-center gap-4">
          <Search className="w-6 h-6" />
          <MoreVertical className="w-6 h-6" />
        </div>
      </header>

      <div className="relative bg-black">
        <div className="w-full aspect-[9/16] bg-black flex items-center justify-center">
          <vturb-smartplayer
            id="vid-69111ec6230c7d2caf64bcd1"
            style={{ display: 'block', margin: '0 auto', width: 'auto', maxWidth: '100%', height: '100%', maxHeight: '100%' }}
          />
        </div>
      </div>

      <div className="px-4 py-3">
        <h1 className="text-lg font-bold mb-2 leading-tight">
          Esta Receta De Cúrcuma Revierte Tu Diabetes Tipo 2 En 7 Días
        </h1>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img
              src="/doutor.jpg"
              alt="Dr. Carlos Jaramillo"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-sm">Dr. Carlos Jaramillo</p>
              <p className="text-xs text-gray-400">5.44m</p>
            </div>
          </div>
          <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-full font-semibold text-sm transition-colors">
            Inscrirse
          </button>
        </div>

        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-800">
          <button
            onClick={handleVideoLike}
            className={`flex items-center gap-2 text-sm transition-colors ${
              videoLiked ? 'text-blue-500' : 'hover:text-gray-300'
            }`}
          >
            <ThumbsUp className={`w-5 h-5 ${videoLiked ? 'fill-current' : ''}`} />
            <span>{videoLikeCount}</span>
          </button>
          <button className="flex items-center gap-2 text-sm hover:text-gray-300 transition-colors">
            <ThumbsDown className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2 text-sm hover:text-gray-300 transition-colors">
            <Share2 className="w-5 h-5" />
            <span>Compartir</span>
          </button>
          <button className="flex items-center gap-2 text-sm hover:text-gray-300 transition-colors">
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-gray-900 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-sm flex items-center gap-2">
              Chat ao vivo
              <span className="text-xs text-gray-400">Reproduzir colaboradas</span>
            </h2>
            <button className="text-xs text-gray-400">▼ 3.9K</button>
          </div>

          <div className="space-y-3 text-sm max-h-96 overflow-y-auto">
            {staticComments.map((comment) => (
              <div key={comment.id} className="flex gap-2">
                <div className={`w-6 h-6 rounded-full bg-${comment.color}-600 flex-shrink-0 flex items-center justify-center text-xs`}>{comment.initial}</div>
                <div className="flex-1">
                  <span className="font-semibold text-gray-300">{comment.name}</span>
                  <p className="text-gray-400 text-xs leading-relaxed">{comment.text}</p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                    <Heart className="w-3 h-3 fill-current" />
                    <span>{comment.likes}</span>
                  </div>
                </div>
              </div>
            ))}

            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-indigo-600 flex-shrink-0 flex items-center justify-center text-xs">V</div>
                <div className="flex-1">
                  <span className="font-semibold text-gray-300">Você</span>
                  <p className="text-gray-400 text-xs leading-relaxed">{comment.text}</p>
                  <button
                    onClick={() => handleLikeComment(comment.id)}
                    className={`flex items-center gap-1 mt-1 text-xs ${comment.likedByUser ? 'text-red-500' : 'text-gray-500'} hover:text-red-400 transition-colors`}
                  >
                    <Heart className={`w-3 h-3 ${comment.likedByUser ? 'fill-current' : ''}`} />
                    <span>{comment.likes > 0 ? comment.likes : ''}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-gray-800">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Clique aqui..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyPress={handleKeyPress}
                maxLength={200}
                className="flex-1 bg-gray-800 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleAddComment}
                className="bg-blue-600 hover:bg-blue-700 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
              >
                <span className="text-lg">→</span>
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center mt-2">{commentText.length}/200</p>
          </div>
        </div>

        <div className="space-y-4 text-sm leading-relaxed text-gray-300 pb-8">
          <p className="font-bold text-white">
            Ellos sabían. Por más de una década, ellos sabían.
          </p>

          <p>
            Una simple receta casera podía curar la diabetes tipo 2 en solo 7 días — y la enterraron. ¿Por qué? Porque funciona. Y si funciona, no obtienen ganancias.
          </p>

          <p>
            Este video ya fue eliminado dos veces. La verdad que estás a punto de ver está siendo silenciada — por la misma industria multimillonaria que te hace creer que los diabetes es "para siempre".
          </p>

          <p className="font-bold text-white">
            Olvida el azúcar. Olvida los genes.
          </p>

          <p>
            La verdadera causa se esconde en tu hígado — y ese truco de cocina que está naturalmente.
          </p>

          <p className="font-bold text-white">
            No es magia. No es una tendencia. Es ciencia que fue enterrada para mantenerte dependiente.
          </p>

          <p>
            Si tu vida o la de un ser querido ha sido lucha con la diabetes tipo 2... necesitas ver esto.
          </p>

          <p className="italic text-yellow-400">
            Míralo ahora. Guárdalo. Compártelo. Porque esta podría ser la última vez que aparece en línea.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
