import React, { useState, useRef, useCallback } from 'react';
import {
    View, Text, TouchableOpacity, ActivityIndicator,
    StyleSheet, ScrollView, RefreshControl,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { Colors } from '../constants/Colors';
import { useTheme } from '../context/ThemeContext';
import { useT } from '../hooks/useT';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface WebViewScreenParams {
    url: string;
    title: string;
    subtitle?: string;
}

const injectedCSS = `
    (function() {
        var style = document.createElement('style');
        style.textContent = \`
            header, .site-header, nav.navbar, .footer, footer, .breadcrumb-wrapper { display: none !important; }
            body { padding-top: 0 !important; margin-top: 0 !important; }
            .main-content, main, #main, .container { padding-top: 8px !important; }
        \`;
        document.head.appendChild(style);
    })();
    true;
`;

/** Generic in-app browser used for the Mandirpedia links in the More section. */
export const WebViewScreen = () => {
    const route = useRoute<any>();
    const { url, title, subtitle } = (route.params ?? {}) as WebViewScreenParams;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [progress, setProgress] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const webViewRef = useRef<WebView>(null);
    const insets = useSafeAreaInsets();
    const { colors: theme } = useTheme();
    const { T } = useT();

    const handleReload = useCallback(() => {
        setError(false);
        setLoading(true);
        webViewRef.current?.reload();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setError(false);
        setLoading(true);
        webViewRef.current?.reload();
    }, []);

    const handleLoadEnd = useCallback(() => {
        setLoading(false);
        setRefreshing(false);
    }, []);

    return (
        <View style={[styles.container, { paddingTop: insets.top, backgroundColor: theme.background }]}>
            <View style={[styles.header, { backgroundColor: theme.background, borderBottomColor: theme.border }]}>
                <View style={styles.headerLeft}>
                    <View style={[styles.iconWrap, { backgroundColor: '#FFF4E6', borderColor: '#FFD59A' }]}>
                        <Ionicons name="globe-outline" size={20} color={Colors.primary} />
                    </View>
                    <View style={{ flexShrink: 1 }}>
                        <Text style={[styles.headerTitle, { color: theme.text }]} numberOfLines={1}>{title}</Text>
                        {!!subtitle && (
                            <Text style={[styles.headerSubtitle, { color: theme.lightText }]} numberOfLines={1}>{subtitle}</Text>
                        )}
                    </View>
                </View>
                <TouchableOpacity onPress={handleReload} style={[styles.reloadBtn, { backgroundColor: '#FFF4E6', borderColor: '#FFD59A' }]} activeOpacity={0.7}>
                    <Ionicons name="refresh" size={20} color={Colors.primary} />
                </TouchableOpacity>
            </View>

            {loading && (
                <View style={[styles.progressBarWrap, { backgroundColor: theme.border }]}>
                    <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
                </View>
            )}

            {error ? (
                <ScrollView
                    contentContainerStyle={{ flex: 1 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            tintColor={Colors.primary}
                            colors={[Colors.primary]}
                        />
                    }
                >
                    <View style={styles.errorContainer}>
                        <View style={[styles.errorIcon, { backgroundColor: '#FFF4E6', borderColor: '#FFD59A' }]}>
                            <Ionicons name="cloud-offline-outline" size={48} color={Colors.primary} />
                        </View>
                        <Text style={[styles.errorTitle, { color: theme.text }]}>{T('temples_offline')}</Text>
                        <Text style={[styles.errorSubtitle, { color: theme.lightText }]}>{T('temples_net_err')}</Text>
                        <TouchableOpacity onPress={handleReload} style={styles.retryBtn} activeOpacity={0.8}>
                            <Ionicons name="refresh" size={16} color="#fff" style={{ marginRight: 6 }} />
                            <Text style={styles.retryText}>{T('temples_retry')}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            ) : (
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{ flex: 1 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            tintColor={Colors.primary}
                            colors={[Colors.primary]}
                            progressBackgroundColor="#FFF4E6"
                        />
                    }
                    scrollEnabled={refreshing}
                >
                    <View style={styles.webviewContainer}>
                        <WebView
                            ref={webViewRef}
                            source={{ uri: url }}
                            style={styles.webview}
                            onLoadStart={() => { setLoading(true); setError(false); }}
                            onLoadEnd={handleLoadEnd}
                            onLoadProgress={({ nativeEvent }) => setProgress(nativeEvent.progress)}
                            onError={() => { setError(true); setLoading(false); setRefreshing(false); }}
                            injectedJavaScript={injectedCSS}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            startInLoadingState={false}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            allowsBackForwardNavigationGestures={true}
                        />
                        {loading && (
                            <View style={[styles.loadingOverlay, { backgroundColor: theme.background }]}>
                                <ActivityIndicator size="large" color={Colors.primary} />
                                <Text style={[styles.loadingText, { color: theme.lightText }]}>{T('temples_loading')}</Text>
                            </View>
                        )}
                    </View>
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
    },
    headerLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 12 },
    iconWrap: {
        borderRadius: 12,
        padding: 8,
        marginRight: 12,
        borderWidth: 1,
    },
    headerTitle: { fontSize: 18, fontWeight: '900' },
    headerSubtitle: { fontSize: 11, fontWeight: '600', marginTop: 1 },
    reloadBtn: {
        borderRadius: 12,
        padding: 8,
        borderWidth: 1,
    },
    progressBarWrap: { height: 3, width: '100%' },
    progressBar: { height: '100%' as any, backgroundColor: Colors.primary },
    webviewContainer: { flex: 1, backgroundColor: '#fff' },
    webview: { flex: 1, backgroundColor: '#fff' },
    loadingOverlay: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: { marginTop: 16, fontSize: 14, fontWeight: '700' },
    errorContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 },
    errorIcon: {
        borderRadius: 24,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
    },
    errorTitle: { fontSize: 20, fontWeight: '900', marginBottom: 8 },
    errorSubtitle: { fontSize: 13, fontWeight: '600', textAlign: 'center', lineHeight: 20, marginBottom: 28 },
    retryBtn: {
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 16,
    },
    retryText: { color: '#fff', fontWeight: '800', fontSize: 14 },
});
