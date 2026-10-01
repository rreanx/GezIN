import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CITIES, ROUTES } from "@/constants/data";
import { useColors } from "@/hooks/useColors";

const ORANGE = "#FF5A10";

type RouteType = "Tarih / Kültür" | "Doğa / Macera" | "Yemek Kültürü" | "Eğlence" ;
type Budget = "Ekonomik" | "Orta" | "Lüks";
type Difficulty = "Kolay" | "Orta" | "Zor";

const ROUTE_TYPES: { label: RouteType; icon: keyof typeof Feather.glyphMap }[] = [
  { label: "Tarih / Kültür", icon: "map-pin" },
  { label: "Doğa / Macera", icon: "triangle" },
  { label: "Yemek Kültürü", icon: "coffee" },
  { label: "Eğlence", icon: "smile" },
 
];

const BUDGETS: { value: Budget; subtitle: string }[] = [
  { value: "Ekonomik", subtitle: "0 – 1.500 ₺" },
  { value: "Orta", subtitle: "1.500 – 7.000 ₺" },
  { value: "Lüks", subtitle: "7.000 ₺+" },
];

export default function PlanScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { cityId } = useLocalSearchParams<{ cityId: string }>();
  const city = CITIES.find((item) => item.id === cityId);

  const [routeTypes, setRouteTypes] = useState<RouteType[]>([]);
  const [budget, setBudget] = useState<Budget>("Orta");
  const [showOpen, setShowOpen] = useState(false);
  const [petFriendly, setPetFriendly] = useState(false);
  const [accessible, setAccessible] = useState(false);
  const [startDate, setStartDate] = useState<number | null>(null);
  const [endDate, setEndDate] = useState<number | null>(null);


  const route = useMemo(
    () => ROUTES.find((item) => item.cityId === cityId) ?? ROUTES[0]!,
    [cityId],
  );

  const toggleRouteType = (type: RouteType) => {
    setRouteTypes((current) =>
      current.includes(type)
        ? current.filter((item) => item !== type)
        : [...current, type],
    );
  };

  const reset = () => {
    setRouteTypes([]);
    const [budget, setBudget] = useState<number | undefined>(undefined);
    setStartDate(null);
    setEndDate(null);
    setShowOpen(false);
    setPetFriendly(false);
    setAccessible(false);
  };

  const selectDate = (date: number) => {
    if (startDate === null || (startDate !== null && endDate !== null)) {
      setStartDate(date);
        setEndDate(null);
        return;
    }
    if (date < startDate) {
      setEndDate(startDate);
      setStartDate(date);
      return;
    }
    setEndDate(date);
  };

const dateLabel = startDate === null
    ? "Tarih Aralığı Seç"
    : endDate === null
    ? `${startDate} Temmuz 2026 . Bitiş Tarihi Seç`
    : `${startDate} Temmuz 2026 - ${endDate} Temmuz 2026`;

  return (
    <View style={[styles.root, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12} style={styles.backButton}>
          <Feather name="chevron-left" size={27} color={colors.foreground} />
        </Pressable>

        <View style={styles.headerCopy}>
          <Text style={[styles.title, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
            Rota Filtreleri
          </Text>
          <Text style={[styles.subtitle, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
            Senin için en uygun rotayı bulalım!
          </Text>
        </View>

        <Pressable onPress={reset} hitSlop={8} style={styles.resetButton}>
          <Text style={[styles.resetText, { fontFamily: "Inter_600SemiBold" }]}>Sıfırla</Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <FilterSection
          number="1"
          title="Temel Filtreler"
          subtitle="Rotanı özelleştir."
        >
          <View style={styles.labelRow}>
            <Text style={[styles.label, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>
              Rota Türü
            </Text>
            <Text style={[styles.helper, { fontFamily: "Inter_400Regular" }]}>Birden fazla seçebilirsin</Text>
          </View>

          <View style={styles.chipGrid}>
            {ROUTE_TYPES.map((type) => {
              const selected = routeTypes.includes(type.label);
              return (
                <Pressable
                  key={type.label}
                  onPress={() => toggleRouteType(type.label)}
                  style={[
                    styles.routeChip,
                    {
                      backgroundColor: selected ? ORANGE : colors.card,
                      borderColor: selected ? ORANGE : colors.border,
                    },
                  ]}
                >
                  <Feather name={type.icon} size={19} color={selected ? "#FFFFFF" : colors.foreground} />
                  <Text
                    style={[
                      styles.routeChipText,
                      { color: selected ? "#FFFFFF" : colors.foreground, fontFamily: "Inter_600SemiBold" },
                    ]}
                  >
                    {type.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Text style={[styles.label, styles.dateLabel, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>
            Tarih Aralığı
          </Text>
          <Pressable style={[styles.dateButton, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Feather name="calendar" size={19} color={colors.mutedForeground} />
            <Text style={[styles.dateText, { color: colors.foreground, fontFamily: "Inter_500Medium" }]}>
              {dateLabel}
            </Text>
            <Feather name="chevron-right" size={19} color={colors.mutedForeground} />
          </Pressable>

          <StaticCalendar colors={colors} startDate={startDate} endDate={endDate} onSelect={selectDate} />
        </FilterSection>

        <FilterSection
          number="2"
          title="Bütçe"
          subtitle="Bütçe ve tercihlerini belirle."
        >
          <Text style={[styles.label, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>Maliyet Grubu</Text>
          <View style={[styles.budgetRow, { borderColor: colors.border }]}>
            {BUDGETS.map((item) => {
              const selected = item.value === budget;
              return (
                <Pressable
                  key={item.value}
                  onPress={() => setBudget(item.value)}
                  style={[styles.budgetChoice, selected && { backgroundColor: ORANGE }]}
                >
                  <Text style={[styles.budgetName, { color: selected ? "#FFFFFF" : colors.foreground, fontFamily: "Inter_700Bold" }]}>
                    {item.value}
                  </Text>
                  <Text style={[styles.budgetSubtitle, { color: selected ? "rgba(255,255,255,0.84)" : colors.mutedForeground }]}>
                    {item.subtitle}
                  </Text>
                </Pressable>
              );
            })}
          </View>

        </FilterSection>

        <FilterSection
          number="3"
          title="Kişiselleştirme"
          subtitle="Tercihlerini belirle."
        >
          <SwitchRow icon="clock" title="Yalnızca kalabalık olmayan yerleri göster" subtitle="Rahatça gez." value={showOpen} onChange={setShowOpen} colors={colors} />
          <SwitchRow icon="heart" title="Evcil hayvan dostu" subtitle="Evcil hayvanıma uygun olsun." value={petFriendly} onChange={setPetFriendly} colors={colors} />
          <SwitchRow
  icon="user-check"
  title="Engelsiz erişim"
  subtitle="Tekerlekli sandalyeye uygun mekanları göster."
  value={accessible}
  onChange={setAccessible}
  colors={colors}
/>
        </FilterSection>

        <Pressable onPress={() => router.replace(`/route/${route.id}`)} style={styles.createButton}>
         <Pressable
  onPress={() => router.replace(`/route/${route.id}`)}
  style={styles.createButton}
>
  

</Pressable>
          <Text style={[styles.createText, { fontFamily: "Inter_700Bold" }]}>Rota Oluştur</Text>
          <Feather name="arrow-right" size={30} color="#FFFFFF" />
        </Pressable>
      </ScrollView>
    </View>
  );
}

function FilterSection({ number, title, subtitle, children }: { number: string; title: string; subtitle: string; children: React.ReactNode }) {
  const colors = useColors();
  return (
    <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.number, { fontFamily: "Inter_700Bold" }]}>{number}</Text>
        <View style={styles.sectionCopy}>
          <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>{title}</Text>
          <Text style={[styles.sectionSubtitle, { color: colors.mutedForeground }]}>{subtitle}</Text>
        </View>
        <Feather name="chevron-up" size={19} color={colors.foreground} />
      </View>
      {children}
    </View>
  );
}

function SwitchRow({ icon, title, subtitle, value, onChange, colors, last = false }: { icon: keyof typeof Feather.glyphMap; title: string; subtitle: string; value: boolean; onChange: (value: boolean) => void; colors: ReturnType<typeof useColors>; last?: boolean }) {
  return (
    <View style={[styles.switchRow, !last && { borderBottomColor: colors.border, borderBottomWidth: 1 }]}>
      <View style={[styles.switchIcon, { backgroundColor: colors.accent }]}>
        <Feather name={icon} size={20} color={ORANGE} />
      </View>
      <View style={styles.switchCopy}>
        <Text style={[styles.switchTitle, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>{title}</Text>
        <Text style={[styles.switchSubtitle, { color: colors.mutedForeground }]}>{subtitle}</Text>
      </View>
      <Switch value={value} onValueChange={onChange} trackColor={{ false: "#D7D9DE", true: ORANGE }} thumbColor="#FFFFFF" />
    </View>
  );
}

function StaticCalendar({ colors, startDate, endDate, onSelect }: { colors: ReturnType<typeof useColors>; startDate: number | null; endDate: number | null; onSelect: (date: number) => void }) {
  const weeks = [
    ["", "", "", "1", "2", "3", "4"],
    ["5", "6", "7", "8", "9", "10", "11"],
    ["12", "13", "14", "15", "16", "17", "18"],
    ["19", "20", "21", "22", "23", "24", "25"],
    ["26", "27", "28", "29", "30", "31", ""],
  ];
  return (
    <View style={[styles.calendar, { backgroundColor: colors.background, borderColor: colors.border }]}>
      <View style={styles.monthHeader}>
        <Feather name="chevron-left" size={18} color={colors.foreground} />
        <Text style={[styles.monthTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>Temmuz 2026</Text>
        <Feather name="chevron-right" size={18} color={colors.foreground} />
      </View>
      <View style={styles.weekRow}>{["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"].map((label) => <Text key={label} style={[styles.weekday, { color: colors.mutedForeground }]}>{label}</Text>)}</View>
      {weeks.map((week, index) => <View key={index} style={styles.weekRow}>{week.map((date, dayIndex) => {
        const value = Number(date);
        const inRange = startDate !== null && endDate !== null && value >= startDate && value <= endDate;
        const selected = value !== 0 && (value === startDate || value === endDate);
        return <Pressable disabled={!date} key={`${index}-${dayIndex}`} onPress={() => onSelect(value)} style={[styles.dateCell, inRange && styles.rangeCell, selected && styles.edgeCell]}><Text style={[styles.dateNumber, { color: selected ? "#FFFFFF" : colors.foreground }]}>{date}</Text></Pressable>;
      })}</View>)}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: { height: 82, paddingHorizontal: 20, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  backButton: { width: 52 },
  headerCopy: { flex: 1, alignItems: "center" },
  title: { fontSize: 21 },
  subtitle: { fontSize: 12.5, marginTop: 4, textAlign: "center" },
  resetButton: { width: 52, alignItems: "flex-end" },
  resetText: { color: ORANGE, fontSize: 13 },
  content: { padding: 16, paddingBottom: 48 },
  section: { borderRadius: 20, borderWidth: 1, padding: 16, marginBottom: 16 },
  sectionHeader: { flexDirection: "row", alignItems: "center", marginBottom: 21 },
  number: { width: 37, height: 37, borderRadius: 19, backgroundColor: ORANGE, color: "#FFFFFF", textAlign: "center", paddingTop: 8, fontSize: 16 },
  sectionCopy: { flex: 1, marginLeft: 12, marginRight: 8 },
  sectionTitle: { fontSize: 18 },
  sectionSubtitle: { fontSize: 12, marginTop: 3 },
  labelRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 11 },
  label: { fontSize: 14 },
  helper: { color: ORANGE, fontSize: 10.5 },
  chipGrid: { flexDirection: "row", flexWrap: "wrap", gap: 9 },
  routeChip: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 13, paddingVertical: 12, borderRadius: 15, borderWidth: 1 },
  routeChipText: { fontSize: 13 },
  dateLabel: { marginTop: 22, marginBottom: 10 },
  dateButton: { height: 52, borderWidth: 1, borderRadius: 15, flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 14 },
  dateText: { flex: 1, fontSize: 12.5 },
  calendar: { borderWidth: 1, borderRadius: 16, padding: 14, marginTop: 10 },
  monthHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 14 },
  monthTitle: { fontSize: 14 },
  weekRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  weekday: { width: "14.28%", textAlign: "center", fontSize: 10 },
  dateCell: { width: "14.28%", height: 29, alignItems: "center", justifyContent: "center" },
  rangeCell: { backgroundColor: "#FFE6D7" },
  edgeCell: { borderRadius: 15, backgroundColor: ORANGE },
  dateNumber: { fontSize: 12 },
  budgetRow: { height: 78, flexDirection: "row", borderWidth: 1, borderRadius: 15, overflow: "hidden" },
  budgetChoice: { flex: 1, alignItems: "center", justifyContent: "center", gap: 5 },
  budgetName: { fontSize: 14 },
  budgetSubtitle: { fontSize: 10.5, textAlign: "center" },
  difficultyLabel: { marginTop: 22, marginBottom: 10 },
  difficultyRow: { flexDirection: "row", gap: 8 },
  difficulty: { flex: 1, minHeight: 103, borderWidth: 1, borderRadius: 15, padding: 10, justifyContent: "center" },
  difficultyName: { fontSize: 13, marginTop: 7 },
  difficultySubtitle: { fontSize: 9.5, marginTop: 3, lineHeight: 13 },
  switchRow: { minHeight: 70, flexDirection: "row", alignItems: "center", gap: 10 },
  switchIcon: { width: 39, height: 39, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  switchCopy: { flex: 1 },
  switchTitle: { fontSize: 13 },
  switchSubtitle: { fontSize: 10.5, marginTop: 3 },
  createButton: { height: 57, backgroundColor: ORANGE, borderRadius: 29, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 21 },
  createText: { color: "#FFFFFF", fontSize: 16 },
});
