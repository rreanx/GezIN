import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CITIES, ROUTES } from "@/constants/data";
import { useColors } from "@/hooks/useColors";

const ORANGE = "#FF5A10";
const CITY_COPY: Record<string, string> = {
  istanbul: "Tarihin, Boğaz'ın ve iki kıtanın eşsiz atmosferini keşfet.",
  kapadokya: "Peri bacaları, vadiler ve gün doğumundaki balonlar seni bekliyor.",
  antalya: "Turkuaz sahiller, antik kentler ve Akdeniz'in sıcak ritmi.",
  rize: "Yemyeşil yaylalar, çay bahçeleri ve Karadeniz'in serin havası.",
};

export default function CityScreen() {
  const colors = useColors(); const router = useRouter(); const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>(); const city = CITIES.find((item) => item.id === id);
  const [saved, setSaved] = useState(false); const routes = ROUTES.filter((item) => item.cityId === id);
  if (!city) return <View style={[styles.notFound, { backgroundColor: colors.background }]}><Text style={{ color: colors.foreground }}>Şehir bulunamadı.</Text></View>;
  const prepared = routes.length ? routes : [];
  return <View style={[styles.root, { backgroundColor: colors.background, paddingTop: insets.top }]}>
    <View style={styles.topBar}><Pressable onPress={() => router.back()} style={[styles.circle, { backgroundColor: colors.card }]}><Feather name="chevron-left" size={25} color={colors.foreground}/></Pressable><View style={styles.topActions}><Pressable style={[styles.circle, { backgroundColor: colors.card }]}><Feather name="share" size={20} color={colors.foreground}/></Pressable><Pressable onPress={() => setSaved((value) => !value)} style={[styles.circle, { backgroundColor: saved ? ORANGE : colors.card }]}><Feather name="heart" size={21} color={saved ? "#fff" : colors.foreground}/></Pressable></View></View>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
      <Text style={[styles.title, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>{city.name} <Text style={{ color: ORANGE }}>●</Text></Text>
      <Text style={[styles.description, { color: colors.mutedForeground }]}>{CITY_COPY[city.id] ?? `${city.name}'ın öne çıkan durakları ve lezzetleri seni bekliyor.`}</Text>
      <View style={styles.hero}><Image source={city.image} contentFit="cover" style={StyleSheet.absoluteFillObject}/><View style={styles.heroBadges}><View style={styles.darkBadge}><Feather name="map-pin" size={13} color="#fff"/><Text style={styles.darkText}>{city.region} Bölgesi</Text></View><View style={styles.darkBadge}><Feather name="star" size={13} color="#fff"/><Text style={styles.darkText}>Popüler</Text></View></View></View>
      <View style={[styles.info, { backgroundColor: colors.card, borderColor: colors.border }]}>{[["sun", "Güncel Hava", "26°C", "Güneşli"], ["clock", "İdeal Süre", "2 - 3 Gün", ""], ["credit-card", "Ortalama Bütçe", "2.000 - 3.800₺", "Kişi başı"], ["users", "Kimler için?", "Aile, Çift", "Arkadaş Grubu"]].map(([icon,label,value,sub])=><View key={label} style={styles.infoItem}><Feather name={icon as any} size={22} color={ORANGE}/><Text style={{color:colors.mutedForeground,fontSize:10,marginTop:8}}>{label}</Text><Text numberOfLines={2} style={{color:colors.foreground,fontWeight:"700",fontSize:13,textAlign:"center",marginTop:3}}>{value}</Text>{sub ? <Text style={{color:ORANGE,fontSize:10,marginTop:2}}>{sub}</Text>:null}</View>)}</View>
      <Header colors={colors} title="Hazır Rotalar" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.routeRow}>{prepared.map((route)=><Pressable key={route.id} onPress={() => router.push(`/route/${route.id}`)} style={[styles.routeCard,{backgroundColor:colors.card,borderColor:colors.border}]}><Image source={route.image} contentFit="cover" style={styles.routeImage}/><Text numberOfLines={2} style={{color:colors.foreground,fontWeight:"700",fontSize:14,marginTop:9}}>{route.title}</Text><Text style={{color:colors.mutedForeground,fontSize:11,marginTop:6}}>{route.durationDays} Gün · {route.days[0]?.stops.length ?? 0} Durak · {route.budget}</Text><Text numberOfLines={2} style={{color:colors.mutedForeground,fontSize:11,lineHeight:16,marginTop:9}}>{route.description}</Text></Pressable>)}{prepared.length===0&&<Text style={{color:colors.mutedForeground}}>Bu şehir için hazır rota yakında eklenecek.</Text>}</ScrollView>
      <Header colors={colors} title="Öne Çıkan Mekanlar" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.places}>{(routes[0]?.highlights ?? [city.name,"Yerel Lezzetler","Manzara Noktası"]).map((place,index)=><View key={place} style={styles.place}><Image source={city.image} contentFit="cover" style={styles.placeImage}/><Text numberOfLines={2} style={{color:colors.foreground,fontSize:11,fontWeight:"600",textAlign:"center",marginTop:6}}>{place}</Text></View>)}</ScrollView>
    </ScrollView>
    <View style={[styles.footer,{backgroundColor:colors.background,borderTopColor:colors.border,paddingBottom:Platform.OS==="ios"?insets.bottom+10:16}]}><Pressable onPress={() => router.push(`/plan/${city.id}`)} style={styles.create}><Feather name="zap" size={19} color="#fff"/><Text style={styles.createText}>Kendi Rotanı Oluştur</Text><Feather name="arrow-right" size={19} color="#fff"/></Pressable></View>
  </View>;
}
function Header({colors,title}:{colors:ReturnType<typeof useColors>;title:string}){return <View style={styles.sectionHead}><Text style={[styles.sectionTitle,{color:colors.foreground,fontFamily:"Inter_700Bold"}]}>{title}</Text><Text style={styles.all}>Tümü  →</Text></View>}
const styles=StyleSheet.create({root:{flex:1},notFound:{flex:1,alignItems:"center",justifyContent:"center"},topBar:{height:64,paddingHorizontal:20,flexDirection:"row",alignItems:"center",justifyContent:"space-between"},topActions:{flexDirection:"row",gap:10},circle:{width:46,height:46,borderRadius:23,alignItems:"center",justifyContent:"center",shadowOpacity:.06,shadowRadius:8,elevation:2},content:{paddingHorizontal:20,paddingBottom:103},title:{fontSize:29,letterSpacing:-.6,marginTop:8},description:{fontSize:15,lineHeight:22,marginTop:7,marginBottom:20,maxWidth:340},hero:{height:263,borderRadius:22,overflow:"hidden",position:"relative"},heroBadges:{position:"absolute",left:13,bottom:13,flexDirection:"row",gap:8},darkBadge:{backgroundColor:"rgba(0,0,0,.7)",borderRadius:14,paddingHorizontal:10,paddingVertical:7,flexDirection:"row",alignItems:"center",gap:5},darkText:{color:"#fff",fontSize:11,fontWeight:"600"},info:{flexDirection:"row",borderWidth:1,borderRadius:20,marginTop:17,paddingVertical:16},infoItem:{flex:1,alignItems:"center",paddingHorizontal:4},sectionHead:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginTop:29,marginBottom:13},sectionTitle:{fontSize:20},all:{color:ORANGE,fontSize:13,fontWeight:"700"},routeRow:{gap:12,paddingRight:4},routeCard:{width:226,borderRadius:16,borderWidth:1,padding:9},routeImage:{height:108,borderRadius:11,width:"100%"},places:{gap:12},place:{width:80},placeImage:{width:80,height:80,borderRadius:14},footer:{borderTopWidth:1,paddingHorizontal:20,paddingTop:10},create:{height:53,borderRadius:27,backgroundColor:ORANGE,flexDirection:"row",justifyContent:"space-between",alignItems:"center",paddingHorizontal:18},createText:{color:"#fff",fontSize:15,fontWeight:"700"}});
