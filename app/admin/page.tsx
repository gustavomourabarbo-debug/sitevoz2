'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { LogIn, Plus, Edit, Trash, Save, LogOut, Image, Eye, Settings, BarChart2 } from 'lucide-react';

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [posts, setPosts] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<any>(null);
  const [filterCategory, setFilterCategory] = useState('Todos');


  // Form Fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('Distrito Federal');
  const [imageUrl, setImageUrl] = useState('');
  const [author, setAuthor] = useState('Voz de Brasília');

  // Settings
  const [gaId, setGaId] = useState('');
  const [adTokenHorizontal, setAdTokenHorizontal] = useState('cad1456400464e69a8a7ada3d2ccab43');
  const [adToken300x250, setAdToken300x250] = useState('02cda84a0e4149c2855e170b9c26dedd');
  const [adToken300x600, setAdToken300x600] = useState('528c9f9e89c0496a8d9da2ba4bfb1124');
  const [activeTab, setActiveTab] = useState<'posts' | 'settings'>('posts');
  const [saveMessage, setSaveMessage] = useState('');

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setIsLoggedIn(true);
      localStorage.setItem('admin_logged', 'true');
      setLoginError('');
    } else {
      setLoginError('Usuário ou senha incorretos.');
    }
  };

  // Logout handler
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('admin_logged');
  };

  // Load posts and settings
  useEffect(() => {
    const logged = localStorage.getItem('admin_logged');
    if (logged === 'true') {
      setIsLoggedIn(true);
    }

    async function loadData() {
      if (!supabase) return;
      
      // Load news
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) {
        setPosts(data);
      }

      // Load GA ID from local storage or settings
      const savedGa = localStorage.getItem('google_analytics_id') || '';
      setGaId(savedGa);

      // Load Ad Tokens
      setAdTokenHorizontal(localStorage.getItem('ad_token_728-90') || 'cad1456400464e69a8a7ada3d2ccab43');
      setAdToken300x250(localStorage.getItem('ad_token_300-250') || '02cda84a0e4149c2855e170b9c26dedd');
      setAdToken300x600(localStorage.getItem('ad_token_300-600') || '528c9f9e89c0496a8d9da2ba4bfb1124');
    }

    loadData();
  }, [isLoggedIn]);

  // Generate slug automatically from title
  useEffect(() => {
    if (!currentPost) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setSlug(generatedSlug);
    }
  }, [title, currentPost]);

  // Open edit / create form
  const openForm = (post: any = null) => {
    if (post) {
      setCurrentPost(post);
      setTitle(post.title);
      setSlug(post.slug);
      setContent(post.content);
      setExcerpt(post.excerpt || '');
      setCategory(post.category || 'Distrito Federal');
      setImageUrl(post.featured_image || '');
      setAuthor(post.author || 'Voz de Brasília');
    } else {
      setCurrentPost(null);
      setTitle('');
      setSlug('');
      setContent('');
      setExcerpt('');
      setCategory('Distrito Federal');
      setImageUrl('');
      setAuthor('Voz de Brasília');
    }
    setIsEditing(true);
  };

  // Save post handler
  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      alert('Supabase não configurado no arquivo .env.local');
      return;
    }

    const categorySlug = category
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const categoryColors: Record<string, string> = {
      'Política': 'bg-red-600',
      'Distrito Federal': 'bg-blue-600',
      'Turismo': 'bg-green-600',
      'Saúde': 'bg-purple-600',
      'Tecnologia': 'bg-blue-500',
      'Esportes': 'bg-orange-600',
      'Economia': 'bg-yellow-600',
      'Meio Ambiente': 'bg-green-700',
      'Internacional': 'bg-indigo-600',
      'Entrevista': 'bg-red-600',
      'Agenda Voz': 'bg-red-600'
    };

    const postData = {
      title,
      slug,
      content,
      excerpt,
      category,
      categoryslug: categorySlug,
      categorycolor: categoryColors[category] || 'bg-blue-600',
      featured_image: imageUrl,
      author,
      updated_at: new Date().toISOString()
    };

    try {
      if (currentPost) {
        // Update
        const { error } = await supabase
          .from('news')
          .update(postData)
          .eq('id', currentPost.id);

        if (error) throw error;
        alert('Notícia atualizada com sucesso!');
      } else {
        // Create
        const { error } = await supabase
          .from('news')
          .insert([{
            ...postData,
            views: 0,
            published_at: new Date().toISOString(),
            created_at: new Date().toISOString()
          }]);

        if (error) throw error;
        alert('Notícia publicada com sucesso!');
      }

      setIsEditing(false);
      // Reload
      const { data } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setPosts(data);

    } catch (err: any) {
      console.error(err);
      alert('Erro ao salvar notícia: ' + err.message);
    }
  };

  // Delete post handler
  const handleDeletePost = async (id: string) => {
    if (!confirm('Deseja realmente excluir esta notícia?')) return;
    if (!supabase) return;

    try {
      const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setPosts(posts.filter(p => p.id !== id));
      alert('Notícia excluída com sucesso.');
    } catch (err: any) {
      alert('Erro ao excluir notícia: ' + err.message);
    }
  };

  // Save Settings handler
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('google_analytics_id', gaId);
    localStorage.setItem('ad_token_728-90', adTokenHorizontal);
    localStorage.setItem('ad_token_300-250', adToken300x250);
    localStorage.setItem('ad_token_300-600', adToken300x600);
    setSaveMessage('Configurações salvas com sucesso! (Os anúncios foram atualizados)');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Painel Admin</h1>
            <p className="text-gray-400 mt-2">Faça login para gerenciar o site</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {loginError && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg text-center">
                {loginError}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Usuário</label>
              <input
                type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Senha</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  const filteredPosts = filterCategory === 'Todos'
    ? posts
    : posts.filter(post => post.category === filterCategory);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* HEADER */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
              <span className="bg-green-600 text-white px-2.5 py-1 rounded">TV VOZ</span>
              PAINEL ADMIN
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-gray-600 hover:text-red-600 font-semibold text-sm transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* DASHBOARD BODY */}
      <div className="max-w-[1400px] w-full mx-auto px-4 py-8 flex-1 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-xl shadow-sm border p-4 space-y-1">
            <button
              onClick={() => { setActiveTab('posts'); setIsEditing(false); }}
              className={`w-full text-left px-4 py-3 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors ${activeTab === 'posts' ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              <Eye className="w-4 h-4" />
              Notícias Postadas
            </button>
            <button
              onClick={() => { setActiveTab('settings'); setIsEditing(false); }}
              className={`w-full text-left px-4 py-3 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors ${activeTab === 'settings' ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              <Settings className="w-4 h-4" />
              Google Analytics
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {activeTab === 'posts' && (
            <>
              {isEditing ? (
                /* CREATE / EDIT FORM */
                <form onSubmit={handleSavePost} className="bg-white rounded-xl shadow-md border p-6 md:p-8 space-y-6">
                  <div className="flex justify-between items-center border-b pb-4">
                    <h2 className="text-xl font-bold text-gray-900">
                      {currentPost ? 'Editar Notícia' : 'Nova Notícia'}
                    </h2>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="text-gray-500 hover:text-gray-700 font-semibold text-sm"
                    >
                      Cancelar
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Título</label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Insira o título da notícia"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Slug (URL)</label>
                      <input
                        type="text"
                        required
                        value={slug}
                        onChange={e => setSlug(e.target.value)}
                        placeholder="ex: titulo-da-noticia"
                        className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Categoria</label>
                      <select
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="Política">Política</option>
                        <option value="Distrito Federal">Distrito Federal</option>
                        <option value="Turismo">Turismo</option>
                        <option value="Saúde">Saúde</option>
                        <option value="Tecnologia">Tecnologia</option>
                        <option value="Esportes">Esportes</option>
                        <option value="Economia">Economia</option>
                        <option value="Meio Ambiente">Meio Ambiente</option>
                        <option value="Internacional">Internacional</option>
                        <option value="Entrevista">Entrevista</option>
                        <option value="Agenda Voz">Agenda Voz</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">URL da Foto Principal</label>
                      <input
                        type="text"
                        value={imageUrl}
                        onChange={e => setImageUrl(e.target.value)}
                        placeholder="https://exemplo.com/foto.jpg"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Resumo (opcional)</label>
                      <textarea
                        value={excerpt}
                        onChange={e => setExcerpt(e.target.value)}
                        placeholder="Breve resumo da notícia"
                        className="w-full px-4 py-2 border rounded-lg h-20 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Conteúdo da Matéria (HTML aceito)</label>
                      <textarea
                        required
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        placeholder="Digite o conteúdo principal da matéria..."
                        className="w-full px-4 py-2 border rounded-lg h-80 focus:outline-none focus:ring-2 focus:ring-green-500 font-mono text-sm"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t flex justify-end">
                    <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-lg flex items-center gap-2 shadow-sm transition-all"
                    >
                      <Save className="w-5 h-5" />
                      Salvar Notícia
                    </button>
                  </div>
                </form>
              ) : (
                /* POSTS LIST */
                <div className="bg-white rounded-xl shadow-sm border p-6 space-y-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b pb-4 gap-4">
                    <h2 className="text-xl font-bold text-gray-900">Notícias Publicadas no Supabase</h2>
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500 font-semibold">Filtrar Categoria:</span>
                        <select
                          value={filterCategory}
                          onChange={e => setFilterCategory(e.target.value)}
                          className="px-3 py-1.5 border rounded-lg text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 font-semibold"
                        >
                          <option value="Todos">Todos</option>
                          <option value="Política">Política</option>
                          <option value="Distrito Federal">Distrito Federal</option>
                          <option value="Turismo">Turismo</option>
                          <option value="Saúde">Saúde</option>
                          <option value="Tecnologia">Tecnologia</option>
                          <option value="Esportes">Esportes</option>
                          <option value="Economia">Economia</option>
                          <option value="Meio Ambiente">Meio Ambiente</option>
                          <option value="Internacional">Internacional</option>
                          <option value="Entrevista">Entrevista</option>
                          <option value="Agenda Voz">Agenda Voz</option>
                        </select>
                      </div>
                      <button
                        onClick={() => openForm()}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors text-sm shadow-sm whitespace-nowrap"
                      >
                        <Plus className="w-4 h-4" />
                        Nova Notícia
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b text-gray-500 text-sm">
                          <th className="pb-3 font-semibold">Foto</th>
                          <th className="pb-3 font-semibold">Título</th>
                          <th className="pb-3 font-semibold">Categoria</th>
                          <th className="pb-3 font-semibold">Visualizações</th>
                          <th className="pb-3 font-semibold text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPosts.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="py-8 text-center text-gray-500 font-medium">
                              Nenhuma notícia encontrada nesta categoria.
                            </td>
                          </tr>
                        ) : (
                          filteredPosts.map((post) => (
                            <tr key={post.id} className="border-b hover:bg-gray-50 transition-colors">
                              <td className="py-3">
                                {post.featured_image ? (
                                  <img
                                    src={post.featured_image}
                                    alt={post.title}
                                    className="w-12 h-12 object-cover rounded-lg"
                                  />
                                ) : (
                                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                                    <Image className="w-6 h-6" />
                                  </div>
                                )}
                              </td>
                              <td className="py-3 pr-4 font-bold text-gray-900 max-w-xs truncate">{post.title}</td>
                              <td className="py-3">
                                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full text-white ${post.categorycolor || 'bg-blue-600'}`}>
                                  {post.category}
                                </span>
                              </td>
                              <td className="py-3 text-gray-600 font-medium">{post.views || 0}</td>
                              <td className="py-3 text-right space-x-2">
                                <button
                                  onClick={() => openForm(post)}
                                  className="text-blue-600 hover:text-blue-800 p-1.5 hover:bg-blue-50 rounded transition-colors"
                                  title="Editar"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeletePost(post.id)}
                                  className="text-red-600 hover:text-red-800 p-1.5 hover:bg-red-50 rounded transition-colors"
                                  title="Excluir"
                                >
                                  <Trash className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === 'settings' && (
            /* GOOGLE ANALYTICS SETTINGS */
            <form onSubmit={handleSaveSettings} className="bg-white rounded-xl shadow-sm border p-6 space-y-6">
              <div className="border-b pb-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-green-600" />
                  Google Analytics Configuração
                </h2>
                <p className="text-gray-500 text-sm mt-1">Insira seu ID de acompanhamento do Google Analytics para ativar o monitoramento de acessos no site.</p>
              </div>

              {saveMessage && (
                <div className="bg-green-50 border border-green-200 text-green-700 text-sm p-4 rounded-lg text-center font-semibold">
                  {saveMessage}
                </div>
              )}

              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Configurações Gerais</h3>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Google Analytics Measurement ID (ID de Medição)</label>
                    <input
                      type="text"
                      value={gaId}
                      onChange={e => setGaId(e.target.value)}
                      placeholder="G-XXXXXXXXXX"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <p className="text-xs text-gray-400 mt-1">Exemplo: G-1234567890</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Tokens de Anúncios (Senso/Outros)</h3>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Banner Horizontal Rodapé (728x90) Token</label>
                    <input
                      type="text"
                      value={adTokenHorizontal}
                      onChange={e => setAdTokenHorizontal(e.target.value)}
                      placeholder="Insira o Token do Banner Horizontal"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Retângulo Lateral Médio (300x250) Token</label>
                    <input
                      type="text"
                      value={adToken300x250}
                      onChange={e => setAdToken300x250(e.target.value)}
                      placeholder="Insira o Token de 300x250"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Vertical Lateral Grande (300x600) Token</label>
                    <input
                      type="text"
                      value={adToken300x600}
                      onChange={e => setAdToken300x600(e.target.value)}
                      placeholder="Insira o Token de 300x600"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t flex justify-end">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-lg flex items-center gap-2 shadow-sm transition-all"
                >
                  <Save className="w-5 h-5" />
                  Salvar ID do Analytics
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
