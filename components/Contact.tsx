import React, { useState, FormEvent } from 'react';
import ScrollReveal from './ScrollReveal';
import ContactBackground from './ContactBackground';
import { Send, MapPin, Loader2, CheckCircle, AlertCircle, Mail, Copy, ChevronDown, ChevronUp } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorDetails, setErrorDetails] = useState('');
  const [showErrorLogs, setShowErrorLogs] = useState(false);
  const [copiedLogs, setCopiedLogs] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');
    setErrorDetails('');
    setShowErrorLogs(false);
    
    // Construct payload for backend matches API guide
    const payload = {
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      company: formData.company,
      message: formData.message,
      // Adding subject as a helpful field for the receiver
      subject: `Contact Form: ${formData.firstName} ${formData.lastName}`
    };

    try {
      const response = await fetch('https://abstrakt-storage.vercel.app/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      // Handle response parsing robustly
      let result;
      const text = await response.text();
      try {
        result = JSON.parse(text);
      } catch (e) {
        // If response is not JSON, treating it as an error
        console.error('Invalid JSON response:', text);
        const errorText = `Invalid server response: ${text.substring(0, 100)}...`;
        setErrorDetails(errorText);
        throw new Error('Invalid server response');
      }
      
      // Check both HTTP status and success flag from API
      if (response.ok && result.success) {
        setStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          message: ''
        });
      } else {
        // Log structured error for debugging - JSON.stringify prevents [object Object] output
        const debugInfo = JSON.stringify(result, null, 2);
        console.error('Submission API Error:', debugInfo);
        setErrorDetails(debugInfo);
        
        // Use human-readable message from API if available
        const msg = result.message || "We encountered an issue submitting your request.";
        setErrorMessage(msg);
        setStatus('error');
      }
    } catch (error: any) {
      console.error('Submission Network/System Error:', error);
      
      // Capture error details for the UI
      const debugInfo = error instanceof Error 
        ? `${error.name}: ${error.message}\n${error.stack || ''}`
        : JSON.stringify(error, null, 2);
      setErrorDetails(debugInfo);

      setStatus('error');
      
      // Friendly error message for network issues
      setErrorMessage(
        error.message === 'Failed to fetch' 
          ? 'Network connection issue. Please check your internet.' 
          : 'Unable to connect to the server. Please try again later.'
      );
    }
  };

  const handleCopyLogs = () => {
    navigator.clipboard.writeText(errorDetails);
    setCopiedLogs(true);
    setTimeout(() => setCopiedLogs(false), 2000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center py-32 px-6 overflow-hidden">
      {/* Background Animation */}
      <ContactBackground />

      <div className="relative z-20 max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-24 items-start">
        
        {/* Left Side: Info */}
        <div className="lg:col-span-2 space-y-12 mt-8">
          <ScrollReveal variant="slide-up">
            <h1 className="text-5xl md:text-6xl font-semibold text-white mb-6 leading-tight">
              Let's Start a <br /> Conversation
            </h1>
            <p className="text-lg text-white/60 font-light leading-relaxed mb-8">
              Whether you're an entrepreneur seeking a partner or an investor looking for opportunities, we're here to help you build something exceptional.
            </p>

            <div className="space-y-6">
               <div className="flex items-start gap-4">
                 <div className="p-3 rounded-full bg-white/5 border border-white/10 text-white">
                   <MapPin size={20} />
                 </div>
                 <div>
                   <h3 className="text-sm uppercase tracking-wider text-white/40 mb-1">Office</h3>
                   <p className="text-xl text-white">Atlanta, GA</p>
                 </div>
               </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-3 w-full">
          <ScrollReveal variant="blur-in" delay={0.2}>
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden transition-all duration-500 ease-in-out">
              
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in-95 duration-500">
                   <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                      <CheckCircle size={40} />
                   </div>
                   <h3 className="text-3xl font-semibold text-white mb-4">Message Sent</h3>
                   <p className="text-lg text-white/60 max-w-md leading-relaxed">
                     Thank you for reaching out. We've received your message and will be in touch shortly.
                   </p>
                   <button 
                     onClick={() => setStatus('idle')}
                     className="mt-8 text-sm text-white/40 hover:text-white transition-colors"
                   >
                     Send another message
                   </button>
                </div>
              ) : status === 'error' ? (
                 <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in-95 duration-500">
                   <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 text-red-400 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                      <AlertCircle size={40} />
                   </div>
                   <h3 className="text-2xl font-semibold text-white mb-2">Submission Issue</h3>
                   <p className="text-lg text-white/60 max-w-md leading-relaxed mb-8">
                     {errorMessage} <br/>Please email us directly instead.
                   </p>
                   <a 
                     href={`mailto:jason@abstrakt.capital?subject=Inquiry from ${formData.firstName} ${formData.lastName}&body=${encodeURIComponent(formData.message)}`}
                     className="px-8 py-4 bg-white text-black font-semibold rounded-sm hover:bg-white/90 transition-all flex items-center gap-2"
                   >
                     <Mail size={18} />
                     Email jason@abstrakt.capital
                   </a>
                   <button 
                     onClick={() => setStatus('idle')}
                     className="mt-6 text-sm text-white/30 hover:text-white transition-colors"
                   >
                     Try Again
                   </button>
                   
                   {/* Technical Log Display */}
                   {errorDetails && (
                     <div className="mt-8 w-full max-w-md">
                       <button 
                         onClick={() => setShowErrorLogs(!showErrorLogs)}
                         className="text-xs text-white/30 hover:text-white/60 flex items-center justify-center gap-1 mx-auto mb-2 transition-colors group"
                       >
                         {showErrorLogs ? 'Hide' : 'Show'} Technical Logs
                         {showErrorLogs ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                       </button>
                       
                       {showErrorLogs && (
                         <div className="relative bg-black/40 border border-white/5 rounded-lg p-4 text-left backdrop-blur-sm animate-in fade-in slide-in-from-top-2">
                           <pre className="text-[10px] text-white/50 overflow-x-auto whitespace-pre-wrap font-mono max-h-32 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pr-8">
                             {errorDetails}
                           </pre>
                           <button 
                             onClick={handleCopyLogs}
                             className="absolute top-2 right-2 p-1.5 hover:bg-white/10 rounded-md text-white/30 hover:text-emerald-400 transition-all"
                             title="Copy logs"
                           >
                             {copiedLogs ? <CheckCircle size={14} className="text-emerald-400"/> : <Copy size={14} />}
                           </button>
                         </div>
                       )}
                     </div>
                   )}
                </div>
              ) : (
                <form className={`space-y-8 transition-opacity duration-300 ${status === 'submitting' ? 'opacity-50 pointer-events-none' : 'opacity-100'}`} onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2 group">
                      <label className="text-xs uppercase tracking-widest text-white/40 group-focus-within:text-white transition-colors">First Name *</label>
                      <input 
                        type="text" 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-b border-white/20 py-3 text-white text-lg placeholder-white/20 focus:outline-none focus:border-white transition-colors"
                        placeholder="Jane"
                      />
                    </div>
                    <div className="space-y-2 group">
                      <label className="text-xs uppercase tracking-widest text-white/40 group-focus-within:text-white transition-colors">Last Name *</label>
                      <input 
                        type="text" 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-b border-white/20 py-3 text-white text-lg placeholder-white/20 focus:outline-none focus:border-white transition-colors"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 group">
                    <label className="text-xs uppercase tracking-widest text-white/40 group-focus-within:text-white transition-colors">Email Address *</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-white/20 py-3 text-white text-lg placeholder-white/20 focus:outline-none focus:border-white transition-colors"
                      placeholder="jane@company.com"
                    />
                  </div>

                  <div className="space-y-2 group">
                    <label className="text-xs uppercase tracking-widest text-white/40 group-focus-within:text-white transition-colors">Company / Organization</label>
                    <input 
                      type="text" 
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-white/20 py-3 text-white text-lg placeholder-white/20 focus:outline-none focus:border-white transition-colors"
                      placeholder="Abstrakt Inc."
                    />
                  </div>

                  <div className="space-y-2 group">
                    <label className="text-xs uppercase tracking-widest text-white/40 group-focus-within:text-white transition-colors">Message *</label>
                    <textarea 
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-white/20 py-3 text-white text-lg placeholder-white/20 focus:outline-none focus:border-white transition-colors resize-none"
                      placeholder="Tell us about your business or inquiry..."
                    />
                  </div>

                  <div className="pt-4">
                      <button 
                          type="submit" 
                          disabled={status === 'submitting'}
                          className="group w-full md:w-auto px-10 py-4 bg-white text-black font-semibold rounded-sm hover:bg-white/90 transition-all flex items-center justify-center gap-2 hover:gap-4 duration-300 disabled:cursor-not-allowed"
                      >
                          {status === 'submitting' ? (
                              <>
                                  <span>Sending...</span>
                                  <Loader2 size={18} className="animate-spin" />
                              </>
                          ) : (
                              <>
                                  <span>Send Message</span>
                                  <Send size={18} />
                              </>
                          )}
                      </button>
                  </div>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;