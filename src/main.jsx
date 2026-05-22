import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { SearchProvider } from './context/SearchContext';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<ThemeProvider>
				<SearchProvider>
					<App />
				</SearchProvider>
			</ThemeProvider>
		</BrowserRouter>
	</StrictMode>
);
