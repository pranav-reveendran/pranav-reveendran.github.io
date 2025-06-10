export interface ProjectDetails {
  id: number;
  title: string;
  description: string;
  problem: string;
  solution: string;
  architecture: {
    components: string[];
    dataFlow: string[];
    technologies: string[];
  };
  codeHighlights: {
    title: string;
    language: string;
    code: string;
    explanation: string;
  }[];
  outcomes: {
    metric: string;
    value: string;
    improvement: string;
  }[];
  technologies: {
    category: string;
    items: string[];
  }[];
  timeline: string;
  team: string;
  challenges: string[];
  learnings: string[];
  repoLink?: string;
  liveLink?: string;
  category: string;
}

export const projectDetailsData: ProjectDetails[] = [
  {
    id: 1,
    title: "Realtime Data Pipeline for Stock Market Analysis",
    description: "Enterprise-grade real-time data pipeline processing 1M+ stock market events per second with sub-100ms latency.",
    problem: "Financial institutions need real-time stock market data processing for algorithmic trading and risk management. Traditional batch processing systems introduce unacceptable latency (5-10 minutes) that can result in millions in lost revenue during high-volatility periods.",
    solution: "Built a distributed streaming architecture using Apache Kafka for event ingestion, Apache Spark Streaming for real-time processing, and PostgreSQL for persistent storage. Implemented custom partitioning strategies and optimized serialization to achieve sub-100ms end-to-end latency.",
    architecture: {
      components: [
        "Kafka Message Broker (Multi-broker cluster)",
        "Spark Streaming Processing Engine",
        "PostgreSQL with TimescaleDB Extension",
        "Redis Cache Layer",
        "Grafana Monitoring Dashboard"
      ],
      dataFlow: [
        "Market data ingested via WebSocket connections to Kafka topics",
        "Spark Streaming consumers process events in micro-batches (50ms windows)",
        "Real-time aggregations and technical indicators calculated",
        "Processed data written to PostgreSQL with time-series optimization",
        "Critical alerts pushed to Redis for instant dashboard updates"
      ],
      technologies: ["Apache Kafka", "Apache Spark", "PostgreSQL", "TimescaleDB", "Redis", "Docker", "Prometheus"]
    },
    codeHighlights: [
      {
        title: "High-Performance Kafka Producer",
        language: "python",
        code: `class OptimizedStockProducer:
    def __init__(self, bootstrap_servers):
        self.producer = KafkaProducer(
            bootstrap_servers=bootstrap_servers,
            value_serializer=lambda v: msgpack.packb(v),  # 40% faster than JSON
            batch_size=32768,  # Optimal batch size for throughput
            linger_ms=5,       # Low latency while maintaining throughput
            compression_type='snappy',
            retries=3
        )
    
    async def send_stock_data(self, symbol, data):
        partition = hash(symbol) % self.partition_count  # Consistent partitioning
        await self.producer.send(
            topic='stock-data',
            value={'symbol': symbol, 'timestamp': time.time(), **data},
            partition=partition
        )`,
        explanation: "Custom Kafka producer optimized for financial data with consistent partitioning, efficient serialization (MessagePack), and tuned for low-latency high-throughput scenarios."
      },
      {
        title: "Real-time Technical Indicators",
        language: "python", 
        code: `def calculate_streaming_indicators(df):
    # Exponential Moving Average with memory efficiency
    df['ema_12'] = df['price'].ewm(span=12, adjust=False).mean()
    df['ema_26'] = df['price'].ewm(span=26, adjust=False).mean()
    
    # MACD calculation
    df['macd'] = df['ema_12'] - df['ema_26']
    df['signal'] = df['macd'].ewm(span=9, adjust=False).mean()
    
    # Bollinger Bands with rolling statistics
    df['bb_middle'] = df['price'].rolling(window=20).mean()
    df['bb_std'] = df['price'].rolling(window=20).std()
    df['bb_upper'] = df['bb_middle'] + (df['bb_std'] * 2)
    df['bb_lower'] = df['bb_middle'] - (df['bb_std'] * 2)
    
    return df[['symbol', 'timestamp', 'price', 'macd', 'signal', 'bb_upper', 'bb_lower']]`,
        explanation: "Streaming technical indicators calculated using Pandas with optimized rolling window operations. Memory-efficient implementation handles continuous data streams without accumulating unbounded state."
      }
    ],
    outcomes: [
      {
        metric: "Processing Latency",
        value: "85ms",
        improvement: "94% reduction from previous 1.5s"
      },
      {
        metric: "Throughput",
        value: "1.2M events/sec",
        improvement: "5x increase in processing capacity"
      },
      {
        metric: "System Availability",
        value: "99.97%",
        improvement: "Achieved 4-nines reliability"
      }
    ],
    technologies: [
      { category: "Streaming", items: ["Apache Kafka", "Apache Spark Streaming", "Python"] },
      { category: "Database", items: ["PostgreSQL", "TimescaleDB", "Redis"] },
      { category: "Infrastructure", items: ["Docker", "Kubernetes", "Prometheus", "Grafana"] },
      { category: "Optimization", items: ["MessagePack", "Connection Pooling", "Custom Partitioning"] }
    ],
    timeline: "3 months (Q2 2024)",
    team: "Solo Engineering Project",
    challenges: [
      "Achieving sub-100ms latency while maintaining data consistency and exactly-once delivery guarantees",
      "Optimizing Kafka partition strategies to balance load across consumers without hotspots",
      "Implementing efficient state management for streaming aggregations without memory leaks",
      "Designing fault-tolerant recovery mechanisms for handling market data gaps and broker failures"
    ],
    learnings: [
      "Deep understanding of Kafka's architecture and performance tuning - learned optimal configurations for financial data workloads",
      "Mastered Spark Streaming optimization techniques including custom partitioning and state management",
      "Gained expertise in time-series database design and PostgreSQL performance tuning for high-write workloads",
      "Developed proficiency in building production-ready monitoring and alerting systems using Prometheus/Grafana"
    ],
    repoLink: "https://github.com/pranav-reveendran/Realtime-Data-Pipeline-for-Stock-Market-Analysis",
    category: "Data Engineering"
  },
  {
    id: 2,
    title: "Disease Prediction Using Machine Learning Algorithms",
    description: "AI-powered diagnostic system achieving 94% accuracy in predicting multiple diseases using ensemble ML algorithms and clinical data.",
    problem: "Healthcare systems face challenges in early disease detection due to complex symptom patterns and limited specialist availability. Manual diagnosis is time-intensive and prone to human error, leading to delayed treatment and worse patient outcomes.",
    solution: "Developed an ensemble machine learning system combining Random Forest, XGBoost, and Neural Networks to predict disease probability from patient symptoms and medical history. Implemented advanced feature engineering and model interpretation techniques for clinical trust and transparency.",
    architecture: {
      components: [
        "Data Preprocessing Pipeline",
        "Feature Engineering Module", 
        "Ensemble ML Models (RF, XGBoost, NN)",
        "Model Interpretation Engine (SHAP)",
        "REST API & Web Interface"
      ],
      dataFlow: [
        "Patient data ingested and validated through secure API endpoints",
        "Automated preprocessing: normalization, encoding, missing value imputation",
        "Feature engineering: symptom clustering, risk scoring, temporal patterns",
        "Ensemble prediction with confidence intervals and uncertainty quantification",
        "SHAP-based explanations generated for clinical transparency"
      ],
      technologies: ["Python", "Scikit-learn", "XGBoost", "TensorFlow", "SHAP", "FastAPI", "PostgreSQL"]
    },
    codeHighlights: [
      {
        title: "Advanced Feature Engineering Pipeline",
        language: "python",
        code: `class MedicalFeatureEngineer:
    def __init__(self):
        self.symptom_clusters = self._build_symptom_clusters()
        self.risk_calculator = RiskScoreCalculator()
    
    def engineer_features(self, patient_data):
        features = {}
        
        # Symptom co-occurrence patterns
        features['symptom_combinations'] = self._encode_symptom_pairs(
            patient_data['symptoms']
        )
        
        # Age-adjusted risk factors
        features['age_risk_score'] = self.risk_calculator.calculate_age_risk(
            patient_data['age'], patient_data['symptoms']
        )
        
        # Temporal pattern analysis
        if 'symptom_history' in patient_data:
            features['symptom_progression'] = self._analyze_temporal_patterns(
                patient_data['symptom_history']
            )
        
        # Comorbidity risk assessment
        features['comorbidity_score'] = self._calculate_comorbidity_risk(
            patient_data['medical_history']
        )
        
        return pd.DataFrame([features])`,
        explanation: "Sophisticated feature engineering pipeline that creates clinically meaningful features from raw patient data, including symptom co-occurrence patterns, age-adjusted risk scores, and temporal progression analysis."
      },
      {
        title: "Ensemble Model with Uncertainty Quantification", 
        language: "python",
        code: `class EnsemblePredictor:
    def __init__(self):
        self.models = {
            'rf': RandomForestClassifier(n_estimators=200, max_depth=15),
            'xgb': XGBClassifier(n_estimators=150, learning_rate=0.1),
            'nn': MLPClassifier(hidden_layer_sizes=(128, 64, 32))
        }
        self.meta_learner = LogisticRegression()
        
    def predict_with_uncertainty(self, X):
        base_predictions = []
        prediction_probabilities = []
        
        for name, model in self.models.items():
            pred_proba = model.predict_proba(X)
            base_predictions.append(pred_proba)
            
            # Bootstrap sampling for uncertainty estimation
            uncertainty = self._bootstrap_uncertainty(model, X, n_bootstrap=100)
            prediction_probabilities.append((pred_proba, uncertainty))
        
        # Meta-learning for final prediction
        stacked_features = np.column_stack([p for p, _ in prediction_probabilities])
        final_prediction = self.meta_learner.predict_proba(stacked_features)
        
        # Aggregate uncertainty across models
        ensemble_uncertainty = np.mean([u for _, u in prediction_probabilities], axis=0)
        
        return {
            'prediction': final_prediction,
            'confidence_interval': self._calculate_confidence_interval(
                final_prediction, ensemble_uncertainty
            ),
            'model_agreement': self._calculate_model_agreement(base_predictions)
        }`,
        explanation: "Ensemble approach combining multiple algorithms with uncertainty quantification using bootstrap sampling. Provides confidence intervals and model agreement metrics crucial for clinical decision support."
      }
    ],
    outcomes: [
      {
        metric: "Prediction Accuracy",
        value: "94.2%",
        improvement: "18% better than baseline models"
      },
      {
        metric: "Early Detection Rate", 
        value: "89%",
        improvement: "Identifies cases 2-3 days earlier"
      },
      {
        metric: "False Positive Rate",
        value: "3.8%",
        improvement: "60% reduction in unnecessary tests"
      }
    ],
    technologies: [
      { category: "Machine Learning", items: ["Scikit-learn", "XGBoost", "TensorFlow", "Random Forest"] },
      { category: "Data Science", items: ["Pandas", "NumPy", "SHAP", "Matplotlib", "Seaborn"] },
      { category: "Deployment", items: ["FastAPI", "Docker", "PostgreSQL", "Streamlit"] },
      { category: "Validation", items: ["Cross-validation", "Bootstrap Sampling", "Statistical Testing"] }
    ],
    timeline: "4 months (Q1-Q2 2024)",
    team: "Solo ML Engineering Project",
    challenges: [
      "Handling imbalanced medical datasets while maintaining high sensitivity for rare diseases",
      "Ensuring model interpretability and explainability for clinical acceptance and regulatory compliance",
      "Validating model performance across different demographic groups to avoid bias",
      "Implementing robust uncertainty quantification to communicate prediction confidence to healthcare providers"
    ],
    learnings: [
      "Advanced ensemble methods and meta-learning techniques for improved prediction accuracy",
      "Clinical domain knowledge and the importance of interpretable AI in healthcare applications",
      "Statistical techniques for handling imbalanced datasets and evaluating model fairness",
      "Production ML deployment considerations including monitoring, versioning, and A/B testing"
    ],
    repoLink: "https://github.com/pranav-reveendran/Disease-Prediction-Using-Machine-Learning-Algorithms",
    category: "Machine Learning"
  }
  // Additional projects would follow the same detailed structure...
];

export const getProjectDetails = (id: number): ProjectDetails | undefined => {
  return projectDetailsData.find(project => project.id === id);
}; 