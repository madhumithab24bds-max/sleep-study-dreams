import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Users, IndianRupee, Shield } from "lucide-react";

interface UserProfile {
  user_id: string;
  display_name: string;
  username: string;
  academic_level: string;
  language: string;
  avatar_url: string;
  created_at: string;
}

interface PaymentLog {
  id: string;
  user_id: string;
  amount: number;
  plan: string;
  upi_id: string;
  status: string;
  created_at: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [payments, setPayments] = useState<PaymentLog[]>([]);
  const [tab, setTab] = useState<"users" | "payments">("users");

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) { navigate("/"); return; }

      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (!data) { navigate("/"); return; }
      setIsAdmin(true);
      loadData();
    };
    checkAdmin();
  }, []);

  const loadData = async () => {
    const [profilesRes, paymentsRes] = await Promise.all([
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
      supabase.from("payment_logs").select("*").order("created_at", { ascending: false }),
    ]);
    if (profilesRes.data) setUsers(profilesRes.data);
    if (paymentsRes.data) setPayments(paymentsRes.data);
  };

  if (isAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground font-display">Verifying access...</div>
      </div>
    );
  }

  const getUserName = (userId: string) => {
    const user = users.find((u) => u.user_id === userId);
    return user?.display_name || user?.username || userId.slice(0, 8);
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="bg-gradient-to-b from-primary/20 to-background px-4 pt-8 pb-6">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft size={16} /> Back to App
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Shield size={22} className="text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-xs text-muted-foreground">Developer access only</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 mt-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <motion.div className="glass-card p-4 text-center" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <Users size={20} className="mx-auto text-primary mb-1" />
            <p className="text-2xl font-display font-bold text-foreground">{users.length}</p>
            <p className="text-xs text-muted-foreground">Total Users</p>
          </motion.div>
          <motion.div className="glass-card p-4 text-center" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
            <IndianRupee size={20} className="mx-auto text-primary mb-1" />
            <p className="text-2xl font-display font-bold text-foreground">{payments.length}</p>
            <p className="text-xs text-muted-foreground">Payment Attempts</p>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setTab("users")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-display font-semibold transition-all ${tab === "users" ? "bg-primary text-primary-foreground" : "glass-card text-muted-foreground"}`}
          >
            👥 Users
          </button>
          <button
            onClick={() => setTab("payments")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-display font-semibold transition-all ${tab === "payments" ? "bg-primary text-primary-foreground" : "glass-card text-muted-foreground"}`}
          >
            💰 Payments
          </button>
        </div>

        {/* Users Tab */}
        {tab === "users" && (
          <div className="space-y-3">
            {users.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No users yet</p>}
            {users.map((user, i) => (
              <motion.div
                key={user.user_id}
                className="glass-card p-4 flex items-center gap-3"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <img
                  src={user.avatar_url || `https://api.dicebear.com/9.x/adventurer/svg?seed=${user.user_id}`}
                  alt="Avatar"
                  className="w-10 h-10 rounded-xl bg-muted object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-display font-semibold text-foreground truncate">
                    {user.display_name || "Unnamed"}
                  </p>
                  <p className="text-xs text-muted-foreground">@{user.username || "—"} · {user.academic_level || "—"}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground">
                    {new Date(user.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-[10px] text-primary">
                    {payments.filter(p => p.user_id === user.user_id).length > 0 ? "💰 Paid" : "Free"}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Payments Tab */}
        {tab === "payments" && (
          <div className="space-y-3">
            {payments.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No payments yet</p>}
            {payments.map((payment, i) => (
              <motion.div
                key={payment.id}
                className="glass-card p-4"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-display font-semibold text-foreground">
                    {getUserName(payment.user_id)}
                  </p>
                  <span className={`text-xs font-display px-2 py-0.5 rounded-full ${
                    payment.status === "initiated" ? "bg-yellow-500/20 text-yellow-400" : "bg-green-500/20 text-green-400"
                  }`}>
                    {payment.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground">
                  <span>Amount:</span><span className="text-foreground font-medium">₹{payment.amount}</span>
                  <span>Plan:</span><span className="text-foreground font-medium">{payment.plan}</span>
                  <span>UPI:</span><span className="text-foreground font-medium">{payment.upi_id}</span>
                  <span>Date:</span><span className="text-foreground font-medium">{new Date(payment.created_at).toLocaleString()}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
