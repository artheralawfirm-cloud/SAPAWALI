import React, { forwardRef } from 'react';
import { ArrowLeft, Video, Phone, MoreVertical, Smile, Paperclip, Camera, Mic, CheckCheck, Check, Lock, ChevronDown, CornerUpRight } from 'lucide-react';
import { ChatConfig, ChatMessage } from '../types';

interface PhonePreviewProps {
  config: ChatConfig;
  className?: string;
}

export const PhonePreview = forwardRef<HTMLDivElement, PhonePreviewProps>(({ config, className = '' }, ref) => {
  const isDark = config.isDarkMode;

  // Authentic WhatsApp Android Palette
  const bgCanvas = isDark ? 'bg-[#0b141a]' : 'bg-[#efeae2]';
  const headerBg = isDark ? 'bg-[#1f2c34]' : 'bg-[#008069]';
  const headerText = 'text-white';
  const statusText = 'text-[#8696a0] text-[13px] font-normal leading-tight';

  const incomingBg = isDark ? 'bg-[#202c33] text-[#e9edef]' : 'bg-[#ffffff] text-[#111b21] shadow-xs';
  const outgoingBg = isDark ? 'bg-[#005c4b] text-[#e9edef]' : 'bg-[#d9fdd3] text-[#111b21] shadow-xs';
  const pillBg = isDark ? 'bg-[#182229] text-[#8696a0]' : 'bg-[#ffffff] text-[#54656f] shadow-xs border border-black/5';

  const inputBarBg = isDark ? 'bg-[#1f2c34]' : 'bg-[#f0f2f5]';
  const inputBg = isDark ? 'bg-[#2a3942] text-[#e9edef]' : 'bg-[#ffffff] text-[#111b21]';

  // Format text linebreaks and clickable links
  const renderMessageContent = (text: string) => {
    if (!text) return null;
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return (
      <div className="whitespace-pre-wrap break-words text-[14.5px] leading-snug tracking-normal max-w-full">
        {parts.map((part, i) => {
          if (part.match(urlRegex)) {
            return (
              <a
                key={i}
                href={part}
                target="_blank"
                rel="noreferrer"
                className="text-[#53bdeb] dark:text-[#53bdeb] text-[#027eb5] underline font-normal break-all hover:opacity-80 transition-opacity"
              >
                {part}
              </a>
            );
          }
          return part;
        })}
      </div>
    );
  };

  return (
    <div
      ref={ref}
      id="whatsapp-chat-frame"
      className={`relative w-[400px] h-auto min-h-[600px] max-w-full rounded-[24px] overflow-hidden shadow-2xl border-[3px] border-slate-800 dark:border-slate-700 bg-[#0b141a] flex flex-col font-sans select-none transition-colors duration-200 ${className}`}
    >
      {/* Top Android Status Bar */}
      <div className={`${headerBg} px-5 pt-2.5 pb-0.5 flex justify-between items-center text-white text-[13px] font-medium tracking-tight select-none border-b border-black/10`}>
        <span>{config.timeTopBar || '20:06'}</span>
        <div className="flex items-center gap-1">
          <span className="text-[11px] font-bold tracking-wider opacity-90">5G</span>
          {/* Signal bars */}
          <div className="flex items-end gap-0.5 h-3">
            <div className="w-0.5 h-1 bg-white"></div>
            <div className="w-0.5 h-1.5 bg-white"></div>
            <div className="w-0.5 h-2 bg-white"></div>
            <div className="w-0.5 h-2.5 bg-white"></div>
          </div>
          {/* Battery pill */}
          <div className="ml-1 border border-white/80 rounded-[3px] px-1 py-0.2 text-[10px] font-extrabold flex items-center justify-center">
            {config.batteryLevel || 85}
          </div>
        </div>
      </div>

      {/* WhatsApp Chat Header */}
      <div className={`${headerBg} px-2 py-2 flex items-center justify-between text-white shadow-md z-10`}>
        <div className="flex items-center gap-1 min-w-0 flex-1">
          <button className="p-1 hover:bg-white/10 rounded-full transition-colors text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          {/* Profile Avatar */}
          <div className="relative w-9 h-9 rounded-full overflow-hidden bg-emerald-800 flex items-center justify-center text-white font-bold text-sm shrink-0 border border-white/10 shadow-xs">
            {config.avatarUrl ? (
              <img src={config.avatarUrl} alt={config.contactName} className="w-full h-full object-cover" />
            ) : (
              <span className="text-white font-extrabold">
                {config.contactName ? config.contactName.replace('(Wali)', '').trim().charAt(0) : 'W'}
              </span>
            )}
          </div>

          {/* Contact Info */}
          <div className="flex flex-col min-w-0 pl-1 flex-1">
            <h2 className="text-[16px] font-semibold tracking-tight truncate leading-tight text-white">
              {config.contactName || '(Wali) Yennei'}
            </h2>
            <span className={`${statusText} truncate block w-full`}>{config.onlineStatus || 'online'}</span>
          </div>
        </div>

        {/* Action Header Icons */}
        <div className="flex items-center gap-3 text-white pr-2 shrink-0">
          <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
            <Video className="w-5 h-5" />
          </button>
          <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
            <Phone className="w-4 h-4" />
          </button>
          <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* WhatsApp Wallpaper & Message Container */}
      <div className={`grow shrink-0 ${bgCanvas} p-3 overflow-visible space-y-2.5 relative flex flex-col justify-start`}>
        
        {/* Authentic WhatsApp Wallpaper Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" 
        />

        {(config?.messages || []).map((msg) => {
          if (msg.type === 'date_header') {
            return (
              <div key={msg.id} className="flex justify-center my-2">
                <span className={`${pillBg} text-[13px] px-3 py-0.5 rounded-md font-normal shadow-xs text-center tracking-tight`}>
                  {msg.text}
                </span>
              </div>
            );
          }

          if (msg.type === 'encryption_notice') {
            return (
              <div key={msg.id} className="flex justify-center my-1.5 px-2">
                <div className={`${isDark ? 'bg-[#182229] text-[#febd2d]' : 'bg-[#ffeebd] text-[#54656f]'} text-[13px] px-3 py-2 rounded-lg leading-tight text-center max-w-[340px] mx-auto w-fit shadow-xs flex items-start gap-1 border border-amber-500/20`}>
                  <Lock className="w-4 h-4 shrink-0 text-[#febd2d] mt-0.5" />
                  <span>
                    Messages and calls are end-to-end encrypted. Only people in this chat can read, listen to, or share them.{' '}
                     <span className="font-bold cursor-pointer hover:underline text-[#53bdeb]">Learn more</span>
                  </span>
                </div>
              </div>
            );
          }

          const isIncoming = msg.type === 'incoming';

          return (
            <div
              key={msg.id}
              className={`flex flex-col my-0.5 relative group ${isIncoming ? 'items-start' : 'items-end'}`}
            >
              {/* Message Bubble Container */}
              <div className="relative max-w-[90%] flex items-start gap-1">
                
                {/* Share/Forward Arrow for Link Cards */}
                {!isIncoming && msg.hasLinkCard && (
                  <button className="self-center p-1 rounded-full bg-black/20 text-white/80 hover:bg-black/40 transition-colors shrink-0">
                    <CornerUpRight className="w-3 h-3" />
                  </button>
                )}

                <div
                  className={`relative rounded-xl px-3 py-1.5 shadow-xs overflow-visible max-w-[85%] ${
                    isIncoming ? incomingBg : outgoingBg
                  } ${isIncoming ? 'rounded-tl-xs' : 'rounded-tr-xs'}`}
                >
                  {/* WhatsApp Rich Link Card Header */}
                  {msg.hasLinkCard && (
                    <div className={`mb-1 rounded-lg p-1.5 ${isDark ? 'bg-[#025144]' : 'bg-[#f0f2f5]'} flex gap-2 items-center overflow-hidden max-w-full`}>
                      {/* Official AHU Logo Emblem */}
                      <div className="w-14 h-14 bg-[#002845] rounded-md flex flex-col items-center justify-center shrink-0 border border-amber-400/50 shadow-xs p-1">
                        <div className="w-full h-full flex flex-col items-center justify-center bg-[#07243c] rounded border border-amber-400 text-amber-400 font-bold text-[10px] tracking-tighter text-center leading-tight">
                          <span className="text-yellow-400 text-[13px] font-black">AHU</span>
                          <span className="text-[7px] text-white/90 uppercase font-bold">KEMENKUM</span>
                        </div>
                      </div>
                      
                      {/* Link Metadata */}
                      <div className="flex flex-col min-w-0 flex-1 overflow-visible">
                        <span className="text-[14.5px] font-bold text-[#111b21] dark:text-white leading-snug line-clamp-2 whitespace-normal">
                          {msg.linkTitle || 'SAPA WALI - Monitoring Perwalian & Pengampuan'}
                        </span>
                        <span className="text-[13px] text-[#667781] dark:text-emerald-100/80 mt-0.5 line-clamp-1 whitespace-normal leading-tight">
                          {msg.linkSubtitle || 'bit.ly'}
                        </span>
                        
                      </div>
                    </div>
                  )}

                  {/* Message Body Text */}
                  {renderMessageContent(msg.text || '')}

                  {/* Timestamp & Read Status (Double Blue Checkmarks) */}
                  <div className={`float-right ml-3 mt-1.5 flex items-center justify-end gap-1 text-[10px] ${isDark ? 'text-white/60' : 'text-gray-500'} select-none`}>
                    <span>{msg.time || '17:26'}</span>
                    {!isIncoming && (
                      <span className="ml-0.5">
                        {msg.status === 'read' ? (
                          <CheckCheck className="w-4 h-4 inline text-[#53bdeb]" />
                        ) : msg.status === 'delivered' ? (
                          <CheckCheck className="w-4 h-4 inline text-[#8696a0]" />
                        ) : (
                          <Check className="w-4 h-4 inline text-[#8696a0]" />
                        )}
                      </span>
                    )}
                  </div>
                </div>

                {/* Share/Forward Arrow for Incoming Link Cards if needed */}
                {isIncoming && msg.hasLinkCard && (
                  <button className="self-center p-1.5 rounded-full bg-black/20 text-white/80 hover:bg-black/40 transition-colors shrink-0">
                    <CornerUpRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {/* Floating Down Arrow Button (Scroll to bottom icon in WhatsApp) */}
        <div className="absolute bottom-3 right-3 z-10">
          <div className="w-7 h-7 bg-[#202c33] border border-white/10 rounded-full flex items-center justify-center text-[#8696a0] shadow-md cursor-pointer hover:bg-[#2a3942] transition-colors">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* WhatsApp Message Input Toolbar */}
      <div className={`${inputBarBg} px-2 py-2 flex items-center gap-1 border-t border-black/10`}>
        <div className={`flex-1 ${inputBg} rounded-full px-3 py-1.5 flex items-center gap-1 shadow-xs`}>
          <Smile className="w-5 h-5 text-[#8696a0] shrink-0 cursor-pointer" />
          <span className="text-[15px] text-[#8696a0] flex-1 font-normal">Message</span>
          <Paperclip className="w-5 h-5 text-[#8696a0] shrink-0 rotate-45 cursor-pointer" />
          <Camera className="w-5 h-5 text-[#8696a0] shrink-0 cursor-pointer" />
        </div>
        <div className="w-10 h-10 bg-[#00a884] hover:bg-[#008f70] rounded-full flex items-center justify-center text-white shadow-md shrink-0 cursor-pointer transition-colors">
          <Mic className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Android Standard Navigation Bar */}
      <div className="bg-black py-1 px-12 flex justify-between items-center text-white/60 select-none">
        <div className="w-3.5 h-3.5 border-2 border-white/60 rounded-xs"></div>
        <div className="w-3.5 h-3.5 border-2 border-white/60 rounded-full"></div>
        <div className="text-white/60 text-base font-bold leading-none">‹</div>
      </div>
    </div>
  );
});

PhonePreview.displayName = 'PhonePreview';
