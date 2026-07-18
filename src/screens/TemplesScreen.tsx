import React, { useState, useRef, useCallback } from 'react';
import {
    View, Text, TouchableOpacity, ActivityIndicator,
    StyleSheet, ScrollView, RefreshControl,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { useT } from '../hooks/useT';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TEMPLES_URL = 'https://paraspur.com/directory/temples.html';

export const TemplesScreen = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [progress, setProgress] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const webViewRef = useRef<WebView>(null);
    const insets = useSafeAreaInsets();
    const { T } = useT();

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

    const handleReload = useCallback(() => {
        setError(false);
        setLoading(true);
        webViewRef.current?.reload();
    }, []);

    // Pull-to-refresh: wraps the WebView in a ScrollView that triggers a reload
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setError(false);
        setLoading(true);
        webViewRef.current?.reload();
        // refreshing spinner is dismissed when the webview finishes loading
    }, []);

    // When webview load ends, stop both loading and refreshing spinners
    const handleLoadEnd = useCallback(() => {
        setLoading(false);
        setRefreshing(false);
    }, []);

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* App-style Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <View style={styles.iconWrap}>
                        <Ionicons name="ellipsis-horizontal-circle" size={20} color={Colors.primary} />
                    </View>
                    <View>
                        <Text style={styles.headerTitle}>{T('nav_more')}</Text>
                        <Text style={styles.headerSubtitle}>{T('temples_subtitle')}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={handleReload} style={styles.reloadBtn} activeOpacity={0.7}>
                    <Ionicons name="refresh" size={20} color={Colors.primary} />
                </TouchableOpacity>
            </View>

            {/* Loading progress bar */}
            {loading && (
                <View style={styles.progressBarWrap}>
                    <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
                </View>
            )}

            {/* Error State */}
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
                        <View style={styles.errorIcon}>
                            <Ionicons name="cloud-offline-outline" size={48} color={Colors.primary} />
                        </View>
                        <Text style={styles.errorTitle}>{T('temples_offline')}</Text>
                        <Text style={styles.errorSubtitle}>{T('temples_net_err')}</Text>
                        <TouchableOpacity onPress={handleReload} style={styles.retryBtn} activeOpacity={0.8}>
                            <Ionicons name="refresh" size={16} color="#fff" style={{ marginRight: 6 }} />
                            <Text style={styles.retryText}>{T('temples_retry')}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            ) : (
                // Pull-to-refresh wrapper around WebView
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
                    // Disable scroll on the outer ScrollView so WebView handles it
                    scrollEnabled={refreshing}
                >
                    <View style={styles.webviewContainer}>
                        <WebView
                            ref={webViewRef}
                            source={{ uri: TEMPLES_URL }}
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
                            <View style={styles.loadingOverlay}>
                                <ActivityIndicator size="large" color={Colors.primary} />
                                <Text style={styles.loadingText}>{T('temples_loading')}</Text>
                            </View>
                        )}
                    </View>
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAF7F0' },
    header: {
        backgroundColor: '#FAF7F0',
        paddingHorizontal: 20,
        paddingVertical: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#EADEC9',
    },
    headerLeft: { flexDirection: 'row', alignItems: 'center' },
    iconWrap: {
        backgroundColor: '#FFF4E6',
        borderRadius: 12,
        padding: 8,
        marginRight: 12,
        borderWidth: 1,
        borderColor: '#FFD59A',
    },
    headerTitle: { fontSize: 18, fontWeight: '900', color: '#3A2D1B' },
    headerSubtitle: { fontSize: 11, color: '#A6947D', fontWeight: '600', marginTop: 1 },
    reloadBtn: {
        backgroundColor: '#FFF4E6',
        borderRadius: 12,
        padding: 8,
        borderWidth: 1,
        borderColor: '#FFD59A',
    },
    progressBarWrap: { height: 3, backgroundColor: '#EADEC9', width: '100%' },
    progressBar: { height: '100%' as any, backgroundColor: Colors.primary },
    webviewContainer: { flex: 1, backgroundColor: '#fff' },
    webview: { flex: 1, backgroundColor: '#fff' },
    loadingOverlay: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: '#FAF7F0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: { marginTop: 16, fontSize: 14, color: '#A6947D', fontWeight: '700' },
    errorContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 },
    errorIcon: {
        backgroundColor: '#FFF4E6',
        borderRadius: 24,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#FFD59A',
    },
    errorTitle: { fontSize: 20, fontWeight: '900', color: '#3A2D1B', marginBottom: 8 },
    errorSubtitle: { fontSize: 13, color: '#A6947D', fontWeight: '600', textAlign: 'center', lineHeight: 20, marginBottom: 28 },
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
