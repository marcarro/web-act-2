interface LoginFormElementProps {
    title: string
    placeholder: string
    value: string;
    onChange: (value: string) => void;
    type?: 'text' | 'password' | 'email';
}

export default function LoginFormElement({ title, placeholder, value, onChange, type = 'text' }: LoginFormElementProps) {
    return (
        <div className="text-left mb-6">
        <div className="mb-2 text-sm font-medium text-gray-300/80 ml-1">
          {title}
        </div>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-gray-900/50 py-3 px-4 rounded-lg w-full text-gray-100 border border-gray-700/50 hover:border-gray-600/50 transition-colors duration-200 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 focus:outline-none"
        />
      </div>
    );
  }